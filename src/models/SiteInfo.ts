import mongoose from "mongoose";

const siteInfoSchema = new mongoose.Schema({
  heroTitle: {type: String, required: true},
  heroSubtitle: {type: String, required: true},
  recordFish: {
    species: String,
    weight: Number,
    year: String,
  },
  updatedAt: {type: Date, default: Date.now},
});

export default mongoose.models.SiteInfo ||
  mongoose.model("SiteInfo", siteInfoSchema);
