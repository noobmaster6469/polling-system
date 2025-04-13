import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
  },
  { timestamps: true }
);

const OptionModel = mongoose.model("Option", OptionSchema);
export default OptionModel;
