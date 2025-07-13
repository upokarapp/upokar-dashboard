import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", schema);

export default Notification;
