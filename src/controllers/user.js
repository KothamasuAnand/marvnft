const User = require("../models/user");
const { mapUser } = require("../utils/user");
const { sendError } = require("../utils/utils");

const userControllers = {
  // get logged-in user
  get: async (req, res, next) => {
    try {
      const user = await User.findOne({ where: { id: req.user } });

      if (!user) {
        return sendError("User not found!", 404, res);
      }

      res.json(mapUser(user.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // get other users
  getAll: async (req, res, next) => {
    try {
      let { page, per_page } = req.query;

      if (!page) {
        page = 1;
      } else {
        page = Number(page);
      }

      if (!per_page) {
        per_page = 10;
      } else {
        per_page = Number(per_page);
      }

      const offset = (page - 1) * per_page;

      const users = await User.findAll({
        offset: offset,
        limit: per_page,
        order: [["createdAt", "DESC"]],
      });

      res.json(users.map((user) => user.toJSON()).map(mapUser));
    } catch (err) {
      next(err);
    }
  },

  // get other user by external id
  getByExtId: async (req, res, next) => {
    try {
      const extId = req.params.userId;

      if (!extId) {
        return sendError("User Id is required!", 400, res);
      }

      const user = await User.findOne({ where: { ext_id: extId } });

      if (!user) {
        return sendError("User not found!", 404, res);
      }

      res.json(mapUser(user.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // delete logged-in user
  delete: async (req, res, next) => {
    try {
      const result = await User.destroy({ where: { id: req.user } });
      console.log(result);

      if (!result) {
        return sendError("Error deleting user!", 409, res);
      }

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userControllers;
