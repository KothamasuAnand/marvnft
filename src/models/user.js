const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// defining user model
const User = sequelize.define("user", {
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
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  pfp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  wallet_address: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true,
  }
});

module.exports = User;
