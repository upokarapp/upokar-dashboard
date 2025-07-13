import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", schema);

export default Token;
