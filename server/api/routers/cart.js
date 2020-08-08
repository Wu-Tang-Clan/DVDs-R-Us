const cartRouter = require('express').Router();
const { Cart, Order } = require('../../db/Models/index');

cartRouter.post('/addtocart', async (req, res) => {
  const { movieId, quantity } = req.body;
  const cart = await Cart.findOne({
    where: {
      sessionId: req.session_id,
    },
  });
  const createdOrder = await Order.create(
    {
      movieId,
      quantity,
      CartId: cart.id,
    },
  );
  res.send(createdOrder);
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

cartRouter.delete('/removefromcart/:movieid/:cartid', async (req, res) => {
  await Order.destroy({ where: { CartId: req.params.cartid, movieId: req.params.movieid } });
  res.sendStatus(200);
});

cartRouter.put('/editcartquantity/:movieid/:cartid', async (req, res) => {
  // const allOrders =    await Order.findAll({ where: { movieId: req.params.movieid,
  // CartId: req.params.cartid } });
  // console.log("allOrders-- ",allOrders);
  // console.log("allOrders-- ",allOrders.length);
  await Order.update({ quantity: 0 },
    { where: { movieId: req.params.movieid, CartId: req.params.cartid } });
  const order = await Order.findOne({
    where: {
      movieId: req.params.movieid,
      CartId: req.params.cartid,
    },
  });
  await Order.update({ quantity: req.body.quantity },
    { where: { movieId: order.movieId, CartId: order.CartId, id: order.id } });

  await Order.destroy({
    where: {
      movieId: req.params.movieid,
      CartId: req.params.cartid,
      quantity: 0,
    },
  });
  res.sendStatus(200);
});

module.exports = cartRouter;
