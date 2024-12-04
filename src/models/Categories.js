import mongoose from "mongoose";
import Blog from "./Blog";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Category"],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

// Middleware for findOneAndUpdate to handle slug on updates
CategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = update.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    this.setUpdate(update);
  }
  next();
});

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
);

export default mongoose.models.Categories ||
  mongoose.model("Categories", CategorySchema);
