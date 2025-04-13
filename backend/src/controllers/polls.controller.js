import Poll from "../models/Poll.model.js";
import Option from "../models/Option.model.js";

export const showpolls = async (req, res) => {
  try {
    // Fetch all polls with .lean() for better performance
    const polls = await Poll.find().lean();

    // Fetch options for all polls in parallel
    const optionsPromises = polls.map((poll) =>
      Option.find({ pollId: poll._id }).lean()
    );

    // Wait for all options fetch to complete
    const optionsArray = await Promise.all(optionsPromises);

    // Combine polls with their respective options
    const pollsWithOptions = polls.map((poll, index) => ({
      ...poll,
      options: optionsArray[index],
    }));

    return res.status(200).json(pollsWithOptions);
  } catch (error) {
    console.error("Error fetching polls:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body; // Expecting both question and options in the request body

    if (!options || options.length < 2) {
      return res
        .status(400)
        .json({ message: "Poll must have at least two options" });
    }

    const newPoll = new Poll({ question });

    // Save the poll to get pollId (if you want to reference it in options)
    const savedPoll = await newPoll.save();

    // Create Option documents
    const optionDocs = options.map((optionText) => ({
      text: optionText,
      pollId: savedPoll._id, // Reference to the poll
    }));

    // Save options related to the poll
    await Option.insertMany(optionDocs);

    // Now attach the options to the saved poll (optional, you could also just populate later)
    savedPoll.options = optionDocs;

    return res.status(201).json(savedPoll);
  } catch (error) {
    console.error("Error creating poll:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    // Optional: delete associated options if needed
    await Option.deleteMany({ pollId });

    // Delete the poll itself
    const deletedPoll = await Poll.findByIdAndDelete(pollId);

    if (!deletedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error("Error deleting poll:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const votePoll = async (req, res) => {
  try {
    const { pollId, optionId, userId } = req.body;

    // Validate the incoming data
    if (!pollId || !optionId || !userId) {
      return res.status(400).json({
        message: "Poll ID, Option ID, and User ID are required to vote",
      });
    }

    // Find the poll by ID
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    // Check if the user has already voted
    if (poll.voters.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already voted on this poll" });
    }

    // Find the option that the user is voting for
    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    // Update the votes count of the selected option
    option.votes += 1;
    await option.save();

    // Add the user to the voters array of the poll
    poll.voters.push(userId);
    await poll.save();

    // Update the user's votedPolls field
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already voted on this poll, if not, add the poll to the user's votedPolls
    if (!user.votedPolls.includes(pollId)) {
      user.votedPolls.push(pollId);
      await user.save();
    }

    res.status(200).json({ message: "Vote successful" });
  } catch (error) {
    console.error("Error voting on poll:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
