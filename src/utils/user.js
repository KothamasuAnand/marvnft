function mapUser(user) {
  const obj = {
    ...user,
    id: user.ext_id,
    token: user.token,
  };

  delete obj.password;
  delete obj.ext_id;

  return obj;
}

module.exports = { mapUser };
