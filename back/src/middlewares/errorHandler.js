function clientSideError(message) {
  const error = new Error(message);
  error.code = 400;
  return error;
}

clientSideError.prototype = Object.create(Error.prototype);

function notFoundError(message) {
  const error = new Error(message);
  error.code = 404;
  return error;
}

notFoundError.prototype = Object.create(Error.prototype);

function authorizationError(message) {
  const error = new Error(message);
  error.code = 401;
  return error;
}

authorizationError.prototype = Object.create(Error.prototype);

function internalServerError(message) {
  const error = new Error(message);
  error.code = 500;
  return error;
}

internalServerError.prototype = Object.create(Error.prototype);

export {
  clientSideError,
  notFoundError,
  authorizationError,
  internalServerError,
};
