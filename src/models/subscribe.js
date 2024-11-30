import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Subscribe =
  mongoose.models.Subscribe || mongoose.model("Subscribe", SubscribeSchema);

export default Subscribe;
