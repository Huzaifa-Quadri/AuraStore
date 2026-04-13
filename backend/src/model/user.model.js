import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email format",
    ],
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [12, "Password must be at most 12 characters long"],
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
