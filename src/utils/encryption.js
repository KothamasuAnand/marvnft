const bcrypt = require("bcrypt");

async function hash(text) {
  const hash = await bcrypt.hash(text, Number(process.env.BCRYPT_SALT_ROUNDS));
  return hash;
}

async function verifyHash(text, hash) {
  const match = await bcrypt.compare(text, hash);
  return match;
}

module.exports = { hash, verifyHash };
