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

module.exports = cartRouter;
