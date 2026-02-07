import mongoose from "mongoose";

const siteInfoSchema = new mongoose.Schema({
  infoMessage: { type: String },
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
