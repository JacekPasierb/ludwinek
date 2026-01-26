import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  album: {
    type: String,
    required: true,
    enum: ["zbiornik1", "zbiornik2", "zbiornik3", "wydarzenia"],
  },
  url: {type: String, required: true},
  alt: {type: String, default: ""},
  title: {type: String, default: ""},
  order: {type: Number, default: 0},
  isCover: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
});

export default mongoose.models.Photo || mongoose.model("Photo", photoSchema);
