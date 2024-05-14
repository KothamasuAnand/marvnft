function wrapError(error) {
  return { error };
}

function sendError(message, statusCode, res) {
  res.status(statusCode).send(wrapError(message));
}

module.exports = { wrapError, sendError };
