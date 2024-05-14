const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// defining item model
const Sale = sequelize.define("sale", {
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(["started", "ended", "completed"]),
    allowNull: false,
    defaultValue: "started",
  },
});

module.exports = Sale;
