const Sequelize = require('sequelize');

const { UUID, UUIDV4 } = Sequelize;
const { db } = require('../db');

const Session = db.define('session', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = { Session };
