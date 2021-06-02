
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.images = require('./../models/img.model')(sequelize, Sequelize);

module.exports = db;
