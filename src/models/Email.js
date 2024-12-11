import mongoose from "mongoose";

const EmailContent = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "public"],
      default: "draft",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to update the updatedAt field
EmailContent.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.EmailContent ||
  mongoose.model("EmailContent", EmailContent);
