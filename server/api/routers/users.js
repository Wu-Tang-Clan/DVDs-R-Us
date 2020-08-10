const userRouter = require('express').Router();
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const {
  User, Session, Review, Cart, Order,
} = require('../../db/Models/index');

// // //  this will need to bring in the models
// // //  API routes will be in the form of: "userRouter.get()"

userRouter.get('/', async (req, res) => {
  if (req.user && req.user.isAdmin) {
    const users = await User.findAll();
    res.send(users);
  } else {
    res.sendStatus(404);
  }
});

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    res.sendStatus(401);
  } else {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        res.send(err);
      } else if (result === true) {
        const session = await Session.findOne({ where: { id: req.session_id } });
        await Session.update({ UserId: user.id }, { where: { id: session.id } });
        const activeCart = await Cart.findOne({
          where: {
            UserId: user.id,
            isActive: true,
          },
        });
        const currentCart = await Cart.findOne({
          where: {
            sessionId: req.session_id,
          },
        });
        await Order.update({ username: user.username }, { where: { CartId: currentCart.id } });
        if (activeCart) {
          await Order.update({
            CartId: currentCart.id,
          }, { where: { CartId: activeCart.id } });
        }
        await Cart.update({ UserId: user.id }, { where: { id: currentCart.id } });
        if (activeCart) {
          await Cart.destroy({ where: { id: activeCart.id } });
        }
        await res.status(200).send(user);
      } else {
        res.sendStatus(400);
      }
    });
  }
});

userRouter.get('/logincheck', async (req, res) => {
  if (req.user) {
    res.send({ user: req.user, loggedIn: true });
  } else {
    res.send({ user: {}, loggedIn: false });
  }
});

userRouter.delete('/logout', async (req, res) => {
  await Session.destroy({ where: { id: req.session_id } });

  const session = await Session.create();

  const oneWeek = 1000 * 60 * 60 * 24 * 7;

  res.cookie('session_id', session.id, {
    path: '/',
    expires: new Date(Date.now() + oneWeek),
  });

  req.session_id = session.id;
  await Cart.create(
    {
      sessionId: req.session_id,
    },
  );
  res.sendStatus(204);
});

userRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    res.sendStatus(204);
  } else {
    const user = await User.create({ username, password });
    if (!user) {
      res.sendStatus(400);
    } else {
      const session = await Session.findOne({ where: { id: req.session_id } });
      await Session.update({ UserId: user.id }, { where: { id: session.id } });
      const activeCart = await Cart.findOne({
        where: {
          UserId: user.id,
          isActive: true,
        },
      });
      const currentCart = await Cart.findOne({
        where: {
          sessionId: req.session_id,
        },
      });
      if (activeCart) {
        await Order.update({ CartId: currentCart.id, username: user.username },
          { where: { CartId: activeCart.id } });
      }
      await Cart.update({ UserId: user.id }, { where: { id: currentCart.id } });
      if (activeCart) {
        await Cart.destroy({ where: { id: activeCart.id } });
      }
      await res.status(200).send(user);
    }
  }
});

userRouter.post('/review', async (req, res) => {
  const { review, rating, movieId } = req.body;
  const { user } = req;
  const newReview = await Review.create({
    review,
    rating,
    movieId,
    username: user.username,
    UserId: user.id,
  });
  if (newReview) {
    res.send(newReview);
  } else {
    res.sendStatus(400);
  }
});

userRouter.get('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.findAll({ where: { movieId: id } });
  res.send(reviews);
});

userRouter.put('/setadmin/:userid/', async (req, res) => {
  await User.update({ isAdmin: req.body.isAdmin },
    { where: { id: req.params.userid } });
  res.sendStatus(200);
});

module.exports = userRouter;
