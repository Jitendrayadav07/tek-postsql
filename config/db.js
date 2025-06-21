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

db.token = require("../models/tokens")(sequelize, Sequelize);
db.trade = require("../models/trades")(sequelize, Sequelize);

// Association

//Tokens and Trades have one-to-many relationship
db.token.hasMany(db.trade, {
  foreignKey: "token_id",   // token_id is in trades
  sourceKey: "internal_id", // internal_id is in tokens
  as: "trades"
});

db.trade.belongsTo(db.token, {
  foreignKey: "token_id",   // token_id is in trades
  targetKey: "internal_id", // internal_id is in tokens
  as: "token"
});

module.exports = db;

