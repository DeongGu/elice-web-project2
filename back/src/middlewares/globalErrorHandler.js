export function globalErrorHandler(error, req, res, next) {
  console.log(error.code, error.message);
  res.send({ httpStatus: error.code, message: error.message });
}
