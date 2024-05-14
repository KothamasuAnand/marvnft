function mapCategory(category) {
  const obj = {
    ...category,
    id: category.ext_id,
  };

  delete obj.ext_id;
  return obj;
}

module.exports = { mapCategory };
