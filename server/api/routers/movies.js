const movieRouter = require("express").Router();
const { Movie } = require("../../db/Models/Movie");

// // //  this will need to bring in the models
// // //  API routes will be in the form of: "movieRouter.get()"

movieRouter.get("/", async (req, res) => {
  const movies = await Movie.findAll();
  res.send(movies);
});

module.exports = movieRouter;
