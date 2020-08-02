const { Movie } = require('./Movie');
const { Session } = require('./Session');
const { User } = require('./User');

Session.belongsTo(User);
User.hasMany(Session);

module.exports = {
  Movie,
  Session,
  User,
};
