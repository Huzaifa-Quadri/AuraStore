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
    required: [
      function () {
        return this.googleId ? false : true;
      },
      "Contact number is required",
    ],
    unique: true,
    sparse: true,
    //? sparse: true is a configuration for indexes that tells the database: "Only include documents in this index if they actually have this field."

    //? When combined with unique: true, it solves a specific problem with optional fields. Here is the breakdown of why we need it for your contact field:
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
    required: [
      function () {
        // If user is registered with googleId, password is not required
        return this.googleId ? false : true;
      },
      "Password is required",
    ],
    select: false,
  },
  googleId: {
    type: String,
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
