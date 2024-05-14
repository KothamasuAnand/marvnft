const { Sequelize } = require("sequelize");

const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

// connecting to database
const sequelize = new Sequelize(db, user, password, {
  host: host,
  dialect: "mysql",
});

(async () => {
  // testing db connection
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

