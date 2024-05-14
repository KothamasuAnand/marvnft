const Category = require("../models/category");
const { mapCategory } = require("../utils/category");
const { sendError } = require("../utils/utils");

const categoryControllers = {
  create: async (req, res, next) => {
    if (!req.body.categories || !req.body.categories.length) {
      return sendError("Categories must be provided", 400, res);
    }

    try {
      const categories = await Category.bulkCreate(
        req.body.categories.map((c) => {
          return { display_name: c };
        })
      );
      res.json(mapCategory(categories.map((c) => c.toJSON())));
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        order: [["display_name", "ASC"]],
      });

      res.json(
        categories.map((category) => category.toJSON()).map(mapCategory)
      );
    } catch (err) {
      next(err);
    }
  },
};
module.exports = categoryControllers;
