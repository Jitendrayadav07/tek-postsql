// config/db.js
const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ShillCategory = require("../models/ShillCategory")(sequelize, Sequelize);
db.ShillBoard = require("../models/ShillBoard")(sequelize, Sequelize);

module.exports = db;

