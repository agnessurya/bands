const errorHandler = (err, req, res, next) => {
  let code = 500;
  let errMessage = `Internal Server Error`;

  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      errMessage = err.errors[0].message;
      break;

    case "SequelizeUniqueConstraintError":
      code = 400;
      errMessage = err.errors[0].message;
      break;

    case "BandNotFound":
      code = 404;
      errMessage = "Band Not Found";
      break;
      
    case "MaxMember":
      code = 400;
      errMessage = "Maximum Member Limit Exceeded";
      break;

    default:
      break;
  }

  res.status(code).json({ message: errMessage });
};

module.exports = errorHandler;
