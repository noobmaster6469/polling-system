import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const usePollStore = create((set) => ({
  polls: [], // All polls
  isFetchingPolls: false, // To check if polls are being fetched
  isCreatingPoll: false, // To check if a poll is being created
  error: null,

  // Fetch polls
  fetchPolls: async () => {
    set({ isFetchingPolls: true, error: null });
    try {
      const res = await axiosInstance.post("poll/fetchpolls"); // Your backend route to fetch polls
      set({ polls: res.data });
    } catch (error) {
      console.log("Error fetching polls", error);
      set({ error: error.response?.data?.message || "Error fetching polls" });
      toast.error("Failed to fetch polls.");
    } finally {
      set({ isFetchingPolls: false });
    }
  },

  // Create a poll
  createPoll: async (data) => {
    set({ isCreatingPoll: true });
    try {
      const res = await axiosInstance.post("poll/createpoll", data); // Backend route to create poll
      toast.success("Poll created successfully");
      set((state) => ({
        polls: [...state.polls, res.data], // Adding new poll to the store
      }));
    } catch (error) {
      console.log("Error creating poll", error);
      toast.error(error.response?.data?.message || "Failed to create poll.");
    } finally {
      set({ isCreatingPoll: false });
    }
  },

  // Delete a poll (if you want to add that feature later)
  deletePoll: async (pollId) => {
    try {
      await axiosInstance.delete(`poll/deletepoll/${pollId}`);
      set((state) => ({
        polls: state.polls.filter((poll) => poll._id !== pollId),
      }));
      toast.success("Poll deleted successfully");
    } catch (error) {
      toast.error("Error deleting poll", error);
      toast.error(error.response?.data?.message || "Failed to delete poll.");
    }
  },

  votePoll: async (pollId, optionId, userId) => {
    try {
      // Send POST request to the backend to vote
      const res = await axiosInstance.post("poll/votePoll", {
        pollId,
        optionId,
        userId,
      });

      // Update the poll in the state with the new votes
      set((state) => {
        const updatedPolls = state.polls.map((poll) =>
          poll._id === pollId
            ? {
                ...poll,
                options: poll.options.map((option) =>
                  option._id === optionId
                    ? { ...option, votes: option.votes + 1 }
                    : option
                ),
                voters: [...poll.voters, userId], // Add userId to the voters list
              }
            : poll
        );

        return { polls: updatedPolls };
      });

      toast.success("Vote submitted successfully");
    } catch (error) {
      console.log("Error voting on poll", error);
      // toast.error(error.response?.data?.message || "Failed to vote.");
    }
  },
}));
