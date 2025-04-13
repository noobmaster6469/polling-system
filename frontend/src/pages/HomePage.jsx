import React, { useEffect, useState } from "react";
import { usePollStore } from "../store/usePollsStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { CheckCircle } from "lucide-react";

const HomePage = () => {
  const { polls, fetchPolls, votePoll } = usePollStore();
  const { authUser } = useAuthStore();
  const userId = authUser._id;

  // Fetch votedPolls from localStorage based on the userId
  const [votedPolls, setVotedPolls] = useState(() => {
    const votedPollsString = localStorage.getItem(`votedPolls_${userId}`);
    return votedPollsString ? JSON.parse(votedPollsString) : [];
  });

  const [loading, setLoading] = useState(false); // To manage loading state

  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);

  // Save voted polls to localStorage when they change
  useEffect(() => {
    if (votedPolls.length > 0) {
      localStorage.setItem(`votedPolls_${userId}`, JSON.stringify(votedPolls));
    }
  }, [votedPolls, userId]);

  const handleVote = async (pollId, optionId) => {
    if (votedPolls.includes(pollId)) return; // Prevent voting if already voted

    setLoading(true); // Start loading

    try {
      // Call the votePoll method and wait for the response
      await votePoll(pollId, optionId, userId);

      // If vote is successful, update the local state and localStorage
      const updatedVotedPolls = [...votedPolls, pollId];
      setVotedPolls(updatedVotedPolls); // Update state to reflect the new vote
    } catch (error) {
      // Handle error (optional: show a notification to the user)
      console.error("Error while voting:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const hasVoted = (pollId) => {
    return votedPolls.includes(pollId); // Check if the user has voted for this poll
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">Live Polls</h1>

      {polls.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No polls found.</p>
      ) : (
        <div className="space-y-8">
          {polls.map((poll, idx) => (
            <div
              key={poll._id}
              className="card shadow-xl bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <h2 className="card-title text-xl">
                  {idx + 1}. {poll.question}
                </h2>

                <div className="space-y-2 mt-4">
                  {poll.options.map((option) => (
                    <div
                      key={option._id}
                      className="flex items-center justify-between px-4 py-2 rounded bg-base-200"
                    >
                      <span className="text-md font-medium">
                        {option.text} — {option.votes} votes
                      </span>

                      <button
                        onClick={() => handleVote(poll._id, option._id)}
                        className="btn btn-sm btn-primary"
                        disabled={hasVoted(poll._id) || loading} // Disable if user has voted or voting is in progress
                      >
                        {hasVoted(poll._id) ? (
                          <>
                            <CheckCircle size={16} className="mr-1" />
                            Voted
                          </>
                        ) : loading ? (
                          "Voting..."
                        ) : (
                          "Vote"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
