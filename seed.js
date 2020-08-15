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
          stock: 50,
        });
      });
  });

  User.create({
    username: 'admin',
    password: 'Bloccbuster123$',
    isAdmin: true,
  });

  User.create({
    username: 'Nick',
    password: 'Bloccbuster123$',
  });

  User.create({
    username: 'Chad',
    password: 'Bloccbuster123$',
  });

  User.create({
    username: 'Shruti',
    password: 'Bloccbuster123$',
  });

  User.create({
    username: 'Kwon',
    password: 'Bloccbuster123$',
  });
};

seed();

console.log(chalk.greenBright('Data is seeded'));
