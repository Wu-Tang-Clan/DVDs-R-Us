const imdb = require('imdb-api');
const chalk = require('chalk');
const { Movie, User } = require('./server/db/Models/index');
const { db } = require('./server/db/db');
const movieObject = require('./movieObject');
require('dotenv').config();

const sync = async (force = false) => {
  try {
    await db.sync({ force });
    console.log(chalk.green(`DB successfully connected, and synced. Force: ${force}`));
  } catch (e) {
    console.log(chalk.red('Error while connecting to database'));
    throw e;
  }
};

const seed = async () => {
  await sync(true);

  const movieIds = Object.values(movieObject);

  movieIds.forEach((movie) => {
    imdb.get({ id: movie }, { apiKey: process.env.IMDB_API_KEY })
      .then(async (data) => {
        await Movie.create({
          title: data.title,
          director: data.director.split(', '),
          actors: data.actors.split(', '),
          awards: data.awards,
          boxoffice: data.boxoffice,
          genres: data.genres.split(', '),
          id: data.imdbid,
          metascore: data.metascore,
          plot: data.plot,
          poster: data.poster,
          rated: data.rated,
          rating: data.rating,
          production: data.production,
          released: data.released,
          runtime: data.runtime,
          writer: data.writer.split(', '),
          year: data.year,
          price: 0.99,
        });
      });
  });

  User.create({
    username: 'admin',
    password: 'password123',
    isAdmin: true,
  });

  User.create({
    username: 'Nick',
    password: 'password123',
  });

  User.create({
    username: 'Chad',
    password: 'password123',
  });

  User.create({
    username: 'Shruti',
    password: 'password123',
  });

  User.create({
    username: 'Kwon',
    password: 'password123',
  });
};

seed();

console.log(chalk.greenBright('Data is seeded'));
