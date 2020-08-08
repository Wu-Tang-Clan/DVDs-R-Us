const apiRouter = require('express').Router();

apiRouter.use('/movies', require('./movies'));
apiRouter.use('/users', require('./users'));
apiRouter.use('/cart', require('./cart'));

module.exports = apiRouter;
