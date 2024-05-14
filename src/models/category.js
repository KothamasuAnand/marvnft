const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  ext_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
