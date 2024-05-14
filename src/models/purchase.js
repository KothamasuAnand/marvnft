const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Purchase = sequelize.define("purchase", {});

module.exports = Purchase;
