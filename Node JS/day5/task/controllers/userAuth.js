import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

// POST /auth/register
const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      const error = new Error("username, email, and password are required.");
      error.statusCode = 400;
      return next(error);
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      const error = new Error("Email is already registered.");
      error.statusCode = 400;
      return next(error);
    }

    // Password is hashed automatically via pre('save') hook in the model
    const user = await userModel.create({ username, email, password, role });
    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

// POST /auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required.");
      error.statusCode = 400;
      return next(error);
    }

    // select: false in schema — bring password back just for comparison
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      return next(error);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error("Invalid email or password.");
      error.statusCode = 401;
      return next(error);
    }

    const token = generateToken(user);

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

export { register, login };
