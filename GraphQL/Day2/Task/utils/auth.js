import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const generateToken = (user) => {
  return sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
};

const verifyToken = (token) => {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
