function apiSuccess(data, message) {
  console.log(message);
  return { data: data, httpStatus: 200, message: message };
}

function creationSuccess(data, message) {
  console.log(message);
  return { data: data, httpStatus: 201, message: message };
}

export { apiSuccess, creationSuccess };
