const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ItemOwner = sequelize.define("item_owner", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ItemOwner;
