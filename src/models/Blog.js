import mongoose from 'mongoose';
import Categories from './Categories';

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
    default: ''
  },
  coverImage: {
    type: String,
    required: true,
  },
  thumbnailImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'private'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
