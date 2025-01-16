import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  category: {
    type: String,
  },
  address: {
    type: String,
  },
  ratingStars: {
    type: String,
  },
  numberOfRatings: {
    type: String,
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
  leadCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeadCollection",
    required: true,
  },
  email: {
    type: [String],
  },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
