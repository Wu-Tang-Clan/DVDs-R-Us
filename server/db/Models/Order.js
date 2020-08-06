const Sequelize = require('sequelize');

const {
  UUID, UUIDV4, INTEGER, STRING,
} = Sequelize;
const { db } = require('../db');

const Order = db.define('order', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  movieId: {
    type: STRING,
    unique: false,
  },
  CartId: {
    type: STRING,
    unique: false,
  },
});

module.exports = { Order };
