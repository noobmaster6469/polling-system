import React, { useState } from "react";

const dummyPolls = [
  {
    id: 1,
    question: "What's your favorite programming language?",
    options: ["JavaScript", "Python", "Java", "C#"],
  },
  {
    id: 2,
    question: "What's your favorite frontend framework?",
    options: ["React", "Angular", "Vue", "Svelte"],
  },
  {
    id: 3,
    question: "Which backend technology do you prefer?",
    options: ["Node.js", "Django", "Spring", "Ruby on Rails"],
  },
  {
    id: 4,
    question: "What's your favorite database?",
    options: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
  },
  {
    id: 5,
    question: "Which cloud provider do you use the most?",
    options: ["AWS", "Azure", "Google Cloud", "DigitalOcean"],
  },
];

const Polls = () => {
  const [pollVotes, setPollVotes] = useState(
    dummyPolls.map((poll) => ({
      id: poll.id,
      votes: new Array(poll.options.length).fill(0),
      hasVoted: false,
    }))
  );

  const handleVote = (pollId, optionIndex) => {
    setPollVotes((prevVotes) =>
      prevVotes.map((poll) =>
        poll.id === pollId && !poll.hasVoted
          ? {
              ...poll,
              hasVoted: true,
              votes: poll.votes.map((vote, idx) =>
                idx === optionIndex ? vote + 1 : vote
              ),
            }
          : poll
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 bg-base-100 space-y-8 md:px-8">
      {dummyPolls.map((poll, pollIndex) => (
        <div
          key={poll.id}
          className="w-full p-4 bg-base-200 shadow-lg rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-4">{poll.question}</h2>
          <div className="space-y-2">
            {poll.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center justify-between"
              >
                <span className="">{option}</span>
                <button
                  onClick={() => handleVote(poll.id, optionIndex)}
                  className="px-3 py-1 bg-primary/70 text-white rounded-lg hover:bg-primary/80"
                  disabled={pollVotes[pollIndex]?.hasVoted}
                >
                  Vote
                </button>
                <span className="text-gray-500">
                  Votes: {pollVotes[pollIndex]?.votes[optionIndex]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Polls;
