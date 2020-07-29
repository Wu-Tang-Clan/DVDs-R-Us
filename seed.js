const { Movie } = require('./server/db/Models/Movie');
const { db } = require('./server/db/db');
const imdb = require('imdb-api');
const chalk = require('chalk');
const movieObject = require('./movieObject');
require('dotenv').config()

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
    await sync(true)

    const movieIds = Object.values(movieObject);

    movieIds.forEach(movie => {
        imdb.get({id: movie}, {apiKey: process.env.IMDB_API_KEY})
            .then(async data => {
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
                    year: data.year
                    
                })
            })
    })


    console.log(chalk.greenBright('Data is seeded'));
}

seed()
