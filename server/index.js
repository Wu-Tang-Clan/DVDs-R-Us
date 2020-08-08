// const express = require('express');
// const app = express();
// const path = require('path');
// const { db, User, Movie } = require('./db/db');
// const { v4: uuidv4 } = require('uuid');

// //Sever using all the static uses

// app.use(express.json());
// app.use('/dist', express.static(path.join(__dirname, '../dist')));

// // These need to be routed propertly once front-end folders are set up
// // app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../index.html')));

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send({ message: err.message });
// });

// // Setting up port as 3000
// const port = process.env.PORT || 3000;

// db.sync()
//     .then(() => {
//         app.listen(port, () => console.log(`listening on port ${port}`));
//     });

// //Routes for Movie
// app.get('/api/movies', async (req, res, next) => {
//     try {
//         const customers = await Movie.findAll()
//         res.send(customers)
//     } catch (err) {
//         next(err)
//     }
// })
