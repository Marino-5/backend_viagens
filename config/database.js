const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('viagem', 'root', '14082115', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
