function clientSideError(message) {
  if (!message) {
    message = "Client Side Error occured";
  }
  const error = new Error(message);
  error.code = 400;
  return error;
}

clientSideError.prototype = Object.create(Error.prototype);

function notFoundError(message) {
  if (!message) {
    message = "Client Side Error occured";
  }
  const error = new Error(`${message} not found`);
  error.code = 404;
  return error;
}

notFoundError.prototype = Object.create(Error.prototype);

function authorizationError(message) {
  if (!message) {
    message = "Authorization Error Error occured";
  }
  const error = new Error(message);
  error.code = 401;
  return error;
}

authorizationError.prototype = Object.create(Error.prototype);

function internalServerError(message) {
  if (!message) {
    message = "Internal Server Error occured";
  }
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
