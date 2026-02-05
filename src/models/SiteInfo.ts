import mongoose from "mongoose";

const siteInfoSchema = new mongoose.Schema({
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  infoMessage: { type: String, required: true },
  recordFishes: [
    {
      species: { type: String, default: "" },
      weight: { type: Number, default: 0 },
      year: { type: String, default: "" },
      catchDate: { type: String, default: "" },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SiteInfo ||
  mongoose.model("SiteInfo", siteInfoSchema);
