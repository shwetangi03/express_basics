const sendErrorResponse = (res, err) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  const response = {
      message: message,
      status: false,
  };

  return res.status(statusCode).json(response);
};

const sendResponse = (res, data, statusCode) => {
  const response = {
    data: data,
    status: true,
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  sendErrorResponse,
  sendResponse
};

