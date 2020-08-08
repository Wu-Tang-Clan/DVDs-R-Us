const imdb = require('imdb-api');
const movieRouter = require('express').Router();
const { Movie } = require('../../db/Models/index');
require('dotenv').config();

// // //  this will need to bring in the models
// // //  API routes will be in the form of: "movieRouter.get()"

movieRouter.get('/', async (req, res) => {
  const movies = await Movie.findAll();
  res.send(movies);
});

movieRouter.post('/imdbsearch', async (req, res) => {
  const { searchInput } = req.body;
  imdb.search({ name: searchInput }, { apiKey: process.env.IMDB_API_KEY })
    .then((data) => {
      const { results } = data;
      res.send(results);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

movieRouter.post('/order', async (req, res) => {
  const { id } = req.body;
  const movie = await imdb.get({ id }, { apiKey: process.env.IMDB_API_KEY });
  const newMovie = await Movie.create({
    title: movie.title,
    director: movie.director.split(', '),
    actors: movie.actors.split(', '),
    awards: movie.awards,
    boxoffice: movie.boxoffice,
    genres: movie.genres.split(', '),
    id: movie.imdbid,
    metascore: movie.metascore,
    plot: movie.plot,
    poster: movie.poster,
    rated: movie.rated,
    rating: movie.rating,
    production: movie.production,
    released: movie.released,
    runtime: movie.runtime,
    writer: movie.writer.split(', '),
    year: movie.year,
    price: 0.99,
  });

  if (newMovie) {
    res.send(newMovie);
  } else {
    res.sendStatus(400);
  }
});

movieRouter.delete('/remove/:id', async (req, res) => {
  await Movie.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = movieRouter;
