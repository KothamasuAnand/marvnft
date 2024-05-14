function mapContact(contact) {
  const obj = {
    ...contact,
    id: contact.ext_id,
  };

  delete obj.ext_id;
  return obj;
}

module.exports = { mapContact };
