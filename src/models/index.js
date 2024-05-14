const sequelize = require("../db");
const Category = require("./category");
const Item = require("./item");
const ItemOwner = require("./item-owner");
const Purchase = require("./purchase");
const Sale = require("./sale");
const User = require("./user");

function config() {
  // One to Many relationship between user and item
  User.hasMany(Item, { onDelete: "CASCADE" });
  Item.belongsTo(User);

  Category.hasMany(Item, { onDelete: "CASCADE" });
  Item.belongsTo(Category);

  Item.belongsToMany(User, { through: ItemOwner, onDelete: "CASCADE" });
  User.belongsToMany(Item, { through: ItemOwner, onDelete: "CASCADE" });

  Item.belongsToMany(User, { through: Sale, onDelete: "CASCADE" });
  User.belongsToMany(Item, { through: Sale, onDelete: "CASCADE" });

  Sale.belongsToMany(User, { through: Purchase, onDelete: "CASCADE" });
  User.belongsToMany(Sale, { through: Purchase, onDelete: "CASCADE" });

  // synchronizing with the database
  (async () => {
    await sequelize.sync({ alter: false, force: false });
  })();
}

module.exports = { config };
