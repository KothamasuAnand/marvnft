const Contact = require("../models/contact");
const { mapContact } = require("../utils/contact");
const { sendError } = require("../utils/utils");

const contactControllers = {
  create: async (req, res, next) => {
    const { first_name, last_name, query, email } = req.body;

    if (!(first_name && query && email)) {
      return sendError(
        "First Name, Email and Query must be provided",
        400,
        res
      );
    }

    try {
      const contact = await Contact.create({
        first_name,
        email,
        query,
        last_name,
      });
      res.json(mapContact(contact.toJSON()));
    } catch (err) {
      next(err);
    }
  },

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

      const contacts = await Contact.findAll({
        offset: offset,
        limit: per_page,
        order: [["createdAt", "DESC"]],
      });

      res.json(contacts.map((contact) => contact.toJSON()).map(mapContact));
    } catch (err) {
      next(err);
    }
  },
};
module.exports = contactControllers;
