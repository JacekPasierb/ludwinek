import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // na razie trzymamy jawnie, potem dodamy haszowanie
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
