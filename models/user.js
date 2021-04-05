const db = require("../database/database");
const { DataTypes } = require("sequelize");

module.exports = db.define(
  "users",
  {
    ID: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { tableName: "users" }
);
