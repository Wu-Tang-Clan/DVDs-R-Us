const Sequelize = require('sequelize');

const {
  UUID, UUIDV4, INTEGER, STRING, TEXT, ARRAY,
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
  name: {
    type: STRING,
    unique: false,
  },
  images: {
    type: ARRAY(TEXT),
    unique: false,
  },
  username: {
    type: STRING,
    unique: false,
    defaultValue: 'Guest',
  },
});

module.exports = { Order };
