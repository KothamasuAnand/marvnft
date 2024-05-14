const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// defining item model
const Item = sequelize.define("item", {
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
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating:{
    type:DataTypes.INTEGER,
    allowNull: true,
    defaultValue:null,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:null,
  },
  metadata: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = Item;
