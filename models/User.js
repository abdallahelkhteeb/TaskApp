import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Ensure environment variable is loaded (dotenv should be loaded in main entry)
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
});

// Hash password before saving 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
