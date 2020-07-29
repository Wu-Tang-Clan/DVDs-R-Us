const { Sequelize } = require('sequelize');
const chalk = require('chalk')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/DVDsRUs';
//const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5432/DVDsRUs';

const db = new Sequelize(DATABASE_URL, {
    logging: false,
});

module.exports = {
    db,
};
