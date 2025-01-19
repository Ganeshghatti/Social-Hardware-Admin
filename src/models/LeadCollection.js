import mongoose from 'mongoose';

const LeadCollectionSchema = new mongoose.Schema({
  searchIndustry: {
    type: String,
  },
  searchLocation: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LeadCollection|| mongoose.model('LeadCollection', LeadCollectionSchema);
