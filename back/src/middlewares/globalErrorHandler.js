const globalErrorHandler = async (err, req, res, next) => {
  console.log(err.code, err.message);
  return res.status(err.code).send({ message: err.message });
};

export default globalErrorHandler;
