/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
require('dotenv').config();
const chalk = require('chalk');
const cartRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SK);
const {
  Cart, Order, Movie, User,
} = require('../../db/Models/index');

const createPrevCart = async (inactiveId, checkoutTime, orders) => ({
  inactiveId,
  username: orders[0].username,
  checkoutTime,
  orders,
});

cartRouter.post('/addtocart', async (req, res) => {
  const { movieId, quantity } = req.body;
  const cart = await Cart.findOne({
    where: {
      sessionId: req.session_id,
      isActive: true,
    },
  });
  const movie = await Movie.findOne({
    where: {
      id: movieId,
    },
  });
  if ((movie.stock - quantity) >= 0) {
    await Movie.update({ stock: (movie.stock - quantity) }, { where: { id: movieId } });
    if (cart.UserId) {
      const user = await User.findOne({ where: { id: cart.UserId } });
      const createdOrder = await Order.create(
        {
          movieId,
          quantity,
          CartId: cart.id,
          name: movie.title,
          images: [movie.poster],
          username: user.username,
        },
      );
      res.send(createdOrder);
    } else {
      const createdOrder = await Order.create(
        {
          movieId,
          quantity,
          CartId: cart.id,
          name: movie.title,
          images: [movie.poster],
        },
      );
      res.send(createdOrder);
    }
  } else {
    res.sendStatus(204);
  }
});

cartRouter.get('/', async (req, res) => {
  if (req.user) {
    const currentCart = await Cart.findOne({ where: { UserId: req.user.id } });
    const currentOrders = await Order.findAll({ where: { CartId: currentCart.id } });
    res.send(currentOrders);
  } else {
    const currentCart = await Cart.findOne({ where: { sessionId: req.session_id } });
    const currentOrders = await Order.findAll({ where: { CartId: currentCart.id } });
    res.send(currentOrders);
  }
});

cartRouter.get('/active', async (req, res) => {
  if (req.user) {
    const currentCart = await Cart.findOne({ where: { UserId: req.user.id, isActive: true } });
    const currentOrders = await Order.findAll({ where: { CartId: currentCart.id } });
    res.send(currentOrders);
  } else {
    const currentCart = await Cart.findOne({ where: { sessionId: req.session_id, isActive: true } });
    const currentOrders = await Order.findAll({ where: { CartId: currentCart.id } });
    res.send(currentOrders);
  }
});

cartRouter.get('/adminPreviousOrders', async (req, res) => {
  const previousCarts = [];
  const inactive = await Cart.findAll({ where: { isActive: false }, raw: true });
  await inactive.forEach(async (cart, idx) => {
    const orders = await Order.findAll({ where: { CartId: cart.id }, raw: true });
    const inactiveId = uuidv4();
    const prevCart = await createPrevCart(inactiveId, cart.updatedAt, orders);
    await previousCarts.push(prevCart);
    // if (idx === inactive.length - 1) {
    //   await res.send(previousCarts);
    // }
    if (previousCarts.length === inactive.length) {
      await res.send(previousCarts);
    }
  });
});

cartRouter.delete('/removefromcart/:movieid/:cartid', async (req, res) => {
  const orders = await Order.findAll({ where: { CartId: req.params.cartid, movieId: req.params.movieid }, raw: true });
  const totalQuantity = orders.reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a += b.quantity;
    return a;
  }, 0);
  const movie = await Movie.findOne({ where: { id: req.params.movieid } });
  await Movie.update({ stock: (movie.stock + totalQuantity) }, { where: { id: req.params.movieid } });
  await Order.destroy({ where: { CartId: req.params.cartid, movieId: req.params.movieid } });
  res.sendStatus(200);
});

cartRouter.put('/editcartquantity/:movieid/:cartid', async (req, res) => {
  const { movieid, cartid } = req.params;
  const { quantity } = req.body;
  // GET CURRENT MOVIE
  const currMovie = await Movie.findOne({ where: { id: movieid } });
  // GET ORDERS
  const currOrders = await Order.findAll({ where: { movieId: movieid, CartId: cartid } });
  // GET CURRENT TOTAL QUANTITY OF ORDERS
  const currQuantity = currOrders.reduce((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a += b.quantity;
    return a;
  }, 0);
  // IF NEW QUANTITY IS GREATER
  if (quantity > currQuantity) {
    // GET DIFFERENCE
    const diff = (quantity - currQuantity);
    // IF SUBTRACTING DIFFERENCE FROM STOCK IS STILL ABOVE ZERO
    if ((currMovie.stock - diff) >= 0) {
      // RETURN OLD STOCK
      await Movie.update({ stock: (currMovie.stock + currQuantity) }, { where: { id: movieid } });
      // RESET ORDER BACK TO ZERO
      await Order.update({ quantity: 0 },
        { where: { movieId: req.params.movieid, CartId: req.params.cartid } });
      // GRAB ONE OF THE ORDERS
      const order = await Order.findOne({
        where: {
          movieId: movieid,
          CartId: cartid,
        },
      });
      // UPDATE ORDER WITH NEW QUANTITY
      await Order.update({ quantity: req.body.quantity },
        { where: { movieId: order.movieId, CartId: order.CartId, id: order.id } });
      const updatedMovie = await Movie.findOne({ where: { id: movieid } });
      // UPDATE MOVIE QUANTITY
      await Movie.update({ stock: (updatedMovie.stock - quantity) }, { where: { id: movieid } });
      await Order.destroy({
        where: {
          movieId: req.params.movieid,
          CartId: req.params.cartid,
          quantity: 0,
        },
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(204);
    }
  } else {
    const diff = (currQuantity - quantity);
    await Movie.update({ stock: (currMovie.stock + currQuantity) }, { where: { id: movieid } });
    await Order.update({ quantity: 0 },
      { where: { movieId: req.params.movieid, CartId: req.params.cartid } });
    const order = await Order.findOne({
      where: {
        movieId: movieid,
        CartId: cartid,
      },
    });
    await Order.update({ quantity: req.body.quantity },
      { where: { movieId: order.movieId, CartId: order.CartId, id: order.id } });
    const updatedMovie = await Movie.findOne({ where: { id: movieid } });
    await Movie.update({ stock: (updatedMovie.stock - quantity) }, { where: { id: movieid } });
    await Order.destroy({
      where: {
        movieId: req.params.movieid,
        CartId: req.params.cartid,
        quantity: 0,
      },
    });
    res.sendStatus(200);
  }
});

cartRouter.put('/checkoutCart', async (req, res) => {
  if (req.user) {
    const currentCart = await Cart.findOne({ where: { UserId: req.user.id, isActive: true } });
    await currentCart.update({ isActive: false });
    const newCart = await Cart.create(
      {
        sessionId: req.session_id,
        UserId: req.user.id,
        isActive: true,
      },
    );
    res.send(newCart);
  } else {
    const currentCart = await Cart.findOne({ where: { sessionId: req.session_id }, isActive: true });
    currentCart.update({ isActive: false });
    const newCart = await Cart.create(
      {
        sessionId: req.session_id,
        isActive: true,
      },
    );
    res.send(newCart);
  }
});

cartRouter.post('/checkout', async (req, res) => {
  try {
    const { token, total, orders } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotencyKey = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: total * 100,
        currency: 'usd',
        customer: customer.id,
        // receipt_email: token.email,
        description: orders.map((order) => `${order.name} (${order.quantity})`).join(', '),
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      },
    );
    res.sendStatus(200);
  } catch (e) {
    // console.error('Error: ', e);
    res.sendStatus(400);
  }
});

module.exports = cartRouter;
