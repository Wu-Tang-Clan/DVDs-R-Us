const userRouter = require('express').Router();
const chalk = require('chalk');
const { User, Session } = require('../../db/Models/index');

// // //  this will need to bring in the models
// // //  API routes will be in the form of: "userRouter.get()"

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });

  console.log('found user', user.username, user.id);
  if (!user) {
    res.sendStatus(401);
  } else {
    console.log(chalk.greenBright('session id from req: ', req.session_id));
    const session = await Session.findOne({ where: { id: req.session_id } });
    await Session.update({ UserId: user.id }, { where: { id: session.id } });
    console.log(chalk.magenta('loggedInUser: ', user.username));
    await res.status(200).send(user);
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

  res.sendStatus(204);
});

module.exports = userRouter;
