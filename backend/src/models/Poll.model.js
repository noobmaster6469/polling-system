import mongoose from "mongoose";

const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Track users who voted
      },
    ],
  },
  { timestamps: true }
);

const PollModel = mongoose.model("Poll", PollSchema);
export default PollModel;
