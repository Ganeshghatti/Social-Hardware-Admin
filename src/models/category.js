import mongoose from "mongoose";
import Blog from "./blog"; // Import Blog model

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Category"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add pre-remove middleware to clean up blog references
CategorySchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function () {
    const categoryId = this.getFilter()._id;
    await Blog.updateMany(
      { category: categoryId },
      { $pull: { category: categoryId } }
    );
  }
)

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
