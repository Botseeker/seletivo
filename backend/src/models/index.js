const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'processos_seletivos',
  username: 'seu_usuario',
  password: 'sua_senha'
});

module.exports = sequelize;