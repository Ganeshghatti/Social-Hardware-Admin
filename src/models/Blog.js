import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  coverImage: {
    type: String,
    required: [true, 'Please provide a cover image'],
  }
}, {
  timestamps: true,
});

// Update slug creation to include timestamp
BlogSchema.pre('save', function(next) {
  const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp
  this.slug = `${this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')}-${timestamp}`;
  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
