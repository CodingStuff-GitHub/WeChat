import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Please enter a password of at least 8 characters"],
    select: false,
  },
});

export default mongoose.model("User", userSchema);
