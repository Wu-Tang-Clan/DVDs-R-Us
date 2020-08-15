const Sequelize = require('sequelize');

const {
  TEXT, INTEGER, STRING, UUID, UUIDV4,
} = Sequelize;

const { db } = require('../db');

const Review = db.define('review', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  review: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: INTEGER,
    allowNull: false,
  },
  username: {
    type: STRING,
  },
});

module.exports = { Review };
