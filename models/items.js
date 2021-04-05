const db = require("../database/database");
const { DataTypes } = require("sequelize");

module.exports = db.define(
  "items",
  {
    ID: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB,
    },
  },
  { tableName: "items" }
);
