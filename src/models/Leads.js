import mongoose from 'mongoose';

const LeadsSchema = new mongoose.Schema({
  searchLeads: {
    type: String,
  },
  searchedCategory: {
    type: String,
  },
  leads: [
    {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        type: String,
      },
      ratingStars: {
        type: String,
      },
      numberOfRatings: {
        type: Number,
      },
      website: {
        type: String,
      },
      industry: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadsSchema);
