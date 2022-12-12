const { Sequelize  } = require('sequelize');
const db = require("../config/db");

module.exports = db.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  role: {
    type: Sequelize.ENUM("admin", "user"),
    allowNull: false,
  },
}, {
  // Other model options go here
});
