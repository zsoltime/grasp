function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(err.stack);
  }

  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
