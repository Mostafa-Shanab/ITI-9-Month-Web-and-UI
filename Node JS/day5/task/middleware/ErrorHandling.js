export const handleError = (err, req, res, next) => {
  // console.log(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Mongoose duplicate key (e.g. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `${field} is already in use.` });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: messages.join(". ") });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(403).json({ error: "Invalid token." });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(403).json({ error: "Token has expired." });
  }

  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export { errorHandler, notFound };
