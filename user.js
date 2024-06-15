const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required:true
  }
});

module.exports = User;
