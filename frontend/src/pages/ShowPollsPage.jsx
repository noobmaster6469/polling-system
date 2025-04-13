import React, { useEffect } from "react";
import { usePollStore } from "../store/usePollsStore"; // Assuming the store path
import { Trash2 } from "lucide-react"; // Lucide React Trash icon

const ShowPollsPage = () => {
  const { polls, fetchPolls, deletePoll } = usePollStore(); // Fetch polls and deletePoll from the store

  useEffect(() => {
    fetchPolls(); // Fetch polls when component mounts
  }, [fetchPolls]);

  const handleDelete = (pollId) => {
    deletePoll(pollId); // Delete the poll using the store method
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Polls</h1>

      {polls.length === 0 ? (
        <p className="text-center text-xl text-gray-500">No polls available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-lg text-center">
            <thead>
              <tr className="bg-primary text-black text-lg">
                <th className="p-4">#</th>
                <th className="p-4">Question</th>
                <th className="p-4">Options</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll, index) => (
                <tr key={poll._id}>
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{poll.question}</td>
                  <td className="p-4">
                    <ul className="list-disc pl-5">
                      {poll.options.map((option, idx) => (
                        <li key={idx}>
                          {option.text} -{" "}
                          <span className="font-semibold">
                            {option.votes || 0} Votes
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(poll._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowPollsPage;
