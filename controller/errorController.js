const AppError = require("../utils/AppError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicated field value ${value}. Please use another value`;
  return new AppError(message, 4000);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJwtError = () =>
  new AppError("Invalid token. Please login again", 401);

const handleJwtExpiredError = () =>
  new AppError("Your token has expired. Please login again", 401);

const sendErrorDev = (err, req, res) => {
  // A API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // A API
  // operational error we trust
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
      });
    }
    // programming error other unknown error
    // send general message
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.kind === "ObjectId") {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === "validationError") {
      error = handleValidationErrorDB(error);
    }

    if (error._message === "User validation failed") {
      error = handleValidationErrorDB(error);
    }

    if (error.name === "JsonWebTokenError") {
      error = handleJwtError();
    }
    if (error.name === "TokenExpiredError") {
      error = handleJwtExpiredError();
    }
    sendErrorProd(error, req, res);
  }
};
