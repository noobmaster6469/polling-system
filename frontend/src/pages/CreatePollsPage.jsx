import { useState } from "react";
import { usePollStore } from "../store/usePollsStore";
import { Link, useNavigate } from "react-router-dom";

const CreatePollsPage = () => {
  const [question, setQuestion] = useState("");
  const [numOptions, setNumOptions] = useState(1);
  const [options, setOptions] = useState([""]);
  const { createPoll } = usePollStore();
  const navigate = useNavigate();

  const handleNumOptionsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumOptions(count);
    setOptions(Array(count).fill(""));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      question,
      options,
    };
    createPoll(payload);
    navigate("/show-polls");
  };

  return (
    <>
      <div className="flex items-center ml-12 mt-16">
        <Link
          className="btn btn-primary text-grey font-semibold text-lg mt-4 "
          to="/show-polls"
        >
          Show All polls
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold">Create a Poll</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mt-16 space-y-4 p-4 border rounded "
        >
          <div>
            <label className="block font-medium mb-1">Question</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Number of Options</label>
            <select
              value={numOptions}
              onChange={handleNumOptionsChange}
              className="w-full border px-3 py-2 rounded"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {options.map((opt, idx) => (
            <div key={idx}>
              <label className="block font-medium mb-1">Option {idx + 1}</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Poll
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePollsPage;
