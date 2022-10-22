const globalErrorHandler = async (err, req, res, next) => {
  if (!err.code) {
    err.code = 500;
  }
  console.log(err.code, err.message);
  return res.status(err.code).send({ message: err.message });
};

export default globalErrorHandler;
