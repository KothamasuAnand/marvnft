const { mapUser } = require("./user");

function mapItem(item) {
  const obj = {
    ...item,
    id: item.ext_id,
  };

  if (item.user) {
    obj.user = mapUser(item.user);
  }

  delete obj.ext_id;
  delete obj.userId;

  return obj;
}

module.exports = { mapItem };
