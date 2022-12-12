const {Sequelize} = require("sequelize");// importar o sequelize
const dotenv = require("dotenv/config.js");// importar o dotenv para localizar as variáveis de ambiente

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql", 
  port: dbPort,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
