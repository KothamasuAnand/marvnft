const jwt = require("jsonwebtoken");

function sign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "8h",
  });
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { sign, verify };
