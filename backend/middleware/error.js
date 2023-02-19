export default (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  return res.status(err.statusCode).json({
    success: false,
    err: err.message,
  });
};
