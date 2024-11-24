import mongoose from 'mongoose';
import category from './category';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add pre-save middleware to generate slug
BlogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
