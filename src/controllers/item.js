const Item = require("../models/item");
const User = require("../models/user");
const { mapItem } = require("../utils/item");
const { sendError } = require("../utils/utils");
const fs = require("fs");
const path = require("path");

const itemControllers = {
  // get logged-in user's items
  get: async (req, res, next) => {
    try {
      const items = await Item.findAll({
        where: { userId: req.user },
        order: [["createdAt", "DESC"]],
      });

      if (!items.length) {
        return sendError("No items found!", 404, res);
      }

      res.json(items.map((item) => item.toJSON()).map(mapItem));
    } catch (err) {
      next(err);
    }
  },

  // create new item
  create: async (req, res, next) => {
    try {
      console.log(req.body);

      const { title, description, price, rating } = req.body;

      if (!(title && description && price)) {
        return sendError("Title and description are required!", 400, res);
      }

      if (!req.file) {
        return sendError("Image is required!", 403, res);
      }

      const item = await Item.create({
        title,
        description,
        price,
        rating,
        userId: req.user,
      });

      // storing image
      if (req.file) {
        const ext = path.extname(req.file.originalname).toLowerCase();
        const fileName = `${item.ext_id}${ext}`;
        const dest = path.join(req.file.destination, `/${fileName}`);

        if ([".png", ".jpg", ".jpeg"].includes(ext)) {
          fs.renameSync(req.file.path, dest);

          item.image = `uploads/${fileName}`;
          await item.save();
        } else {
          return sendError(
            "Only .png, .jpg, .jpeg files are supported!",
            409,
            res
          );
        }
      }

      res.json(mapItem(item.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // update a item
  updateByExtId: async (req, res, next) => {
    try {
      const extId = req.params.itemId;

      if (!extId) {
        return sendError("Item Id is required!", 400, res);
      }

      const { title, description } = req.body;

      if (!(title && description)) {
        return sendError("Title and description are required!", 400, res);
      }

      const result = await Item.update(
        {
          title,
          description,
        },
        {
          where: {
            ext_id: extId,
            userId: req.user,
          },
        }
      );

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  // get other items
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

      const items = await Item.findAll({
        offset: offset,
        limit: per_page,
        order: [["createdAt", "DESC"]],
        include: User,
      });

      res.json(items.map((item) => item.toJSON()).map(mapItem));
    } catch (err) {
      next(err);
    }
  },

  // get other item by external id
  getByExtId: async (req, res, next) => {
    try {
      const extId = req.params.itemId;

      if (!extId) {
        return sendError("Item Id is required!", 400, res);
      }

      const item = await Item.findOne({
        where: { ext_id: extId },
        include: User,
      });

      if (!item) {
        return sendError("Item not found!", 404, res);
      }

      res.json(mapItem(item.toJSON()));
    } catch (err) {
      next(err);
    }
  },

  // delete a item
  deleteByExtId: async (req, res, next) => {
    try {
      const extId = req.params.itemId;

      if (!extId) {
        return sendError("Item Id is required!", 400, res);
      }

      const result = await Item.destroy({
        where: { ext_id: extId, userId: req.user },
      });

      if (!result) {
        return sendError("Error deleting item!", 409, res);
      }

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = itemControllers;
