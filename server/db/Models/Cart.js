const Sequelize = require('sequelize');
const { STRING, TEXT, ARRAY, DATEONLY, INTEGER, DECIMAL } = Sequelize;
const { db } = require('../db');

const Cart = db.define('cart', {
    movies: {
        type: ARRAY,
    }
})

module.exports = { Cart }