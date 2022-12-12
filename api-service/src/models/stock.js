const { Sequelize  } = require('sequelize');
const db = require("../config/db");

module.exports = db.define('stock', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
    },    
    symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    open: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    high: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    low: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    close: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
  // Other model options go here
});
