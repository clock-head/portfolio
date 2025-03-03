exports.handleError = (error, req, res, next) => {
  const title = error.title;
  const message = error.message;
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ validationErrors: 'Page Not Found.' });
};
