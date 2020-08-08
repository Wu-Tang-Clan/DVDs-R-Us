const Sequelize = require('sequelize');

const {
  STRING, TEXT, ARRAY, DATEONLY, INTEGER, DECIMAL,
} = Sequelize;
const { db } = require('../db');

const NO_IMAGE_AVAILABLE = 'https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg';

const Movie = db.define('movie', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  director: {
    type: ARRAY(STRING),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  actors: {
    type: ARRAY(STRING),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  awards: {
    type: STRING,
  },
  boxoffice: {
    type: STRING,
  },
  //  API returns multiple genres as a string, will need to .split(', ') when creating instances
  genres: {
    type: ARRAY(STRING),
    allowNull: false,
  },
  id: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
  },
  metascore: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  plot: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  poster: {
    type: TEXT,
    defaultValue: NO_IMAGE_AVAILABLE,
  },
  rated: {
    type: STRING,
    defaultValue: 'This film is not rated',
  },
  rating: {
    type: DECIMAL,
    defaultValue: 0,
  },
  production: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  released: {
    type: DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  runtime: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //  will need to .split(', ') on writers string here as well
  writer: {
    type: ARRAY(STRING),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  year: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = { Movie };
