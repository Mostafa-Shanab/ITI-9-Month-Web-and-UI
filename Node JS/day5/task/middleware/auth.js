import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, email, role, iat, exp }
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

export { protect };
