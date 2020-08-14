/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import moment from 'moment';
import { changeUserName, getUserPreviousReviews } from '../redux/users/actions';
import { getMovies } from '../redux/movies/actions';
import { adminPreviousOrders } from '../redux/cart/actions';

class UserAccount extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    username: '',
  }

  componentDidMount() {
    const {
      getMovies,
      getUserPreviousReviews,
      // loggedInUser,
      adminPreviousOrders,
      props: {
        match: {
          params: {
            id,
          },
        },
      },
    } = this.props;
    getMovies();
    adminPreviousOrders();
    getUserPreviousReviews(id);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      changeUserName,
      loggedInUser,
      props: {
        history,
      },
    } = this.props;
    await changeUserName(loggedInUser.id, loggedInUser.username, username, history);
    this.setState({ username: '' });
  }

  render() {
    const { username } = this.state;
    const { onSubmit } = this;
    const { userPreviousReviews, inactiveOrders, loggedInUser } = this.props;
    const { movies } = this.props;
    return (
      <div>

        <div style={{ marginTop: '3.75rem' }} className="box">
          <div className="columns">
            <div className="column is-one-third" />
            <form className="column is-one-third" onSubmit={onSubmit}>
              <label className="label">
                Username:
                <input
                  className="input"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  type="text"
                />
              </label>

              <button className="button brandButton" type="submit">Change Username</button>
            </form>
            <div className="column is-one-third" />
          </div>
        </div>

        <div style={{ marginTop: '3.75rem' }} className="box">
          <div className="columns is-multiline">
            <div className="column is-half">
              <p className="title is-4">My Previous Reviews</p>
              <div id="movieBox1" className="adminBox">
                {userPreviousReviews.length && movies.length
                  ? userPreviousReviews.map((review) => {
                    const movie = movies.find((movie) => movie.id === review.movieId);
                    return (
                      <div key={review.id} style={{ padding: '30px' }} className="box">
                        <div className="columns">
                          <div className="column is-one-fifth">
                            <div className="image is-48x48">
                              <img src={movie.poster} alt="movie poster" />
                            </div>
                          </div>
                          <div className="column is-one-quarter">
                            <p className="title is-6">
                              { movie.title }
                              {' '}
                              (
                              { movie.year }
                              )
                            </p>

                          </div>
                          <div className="column is-one-third">
                            <p className="title is-6">
                              { review.review }
                            </p>
                          </div>
                          <div className="column is-one-quarter">
                            <p className="title is-6">
                              {
                                [...Array(review.rating)].map((i, idx) => <i style={{ marginLeft: '5px' }} key={idx} className="fa fa-star" />)
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                  : null}
              </div>
            </div>
            <div className="column is-half">
              <p className="title is-4">My Previous Orders</p>
              <div id="prevUserOrderBox" className="adminBox">
                {
                  // console.log(inactiveOrders)
                  inactiveOrders.length
                    // eslint-disable-next-line max-len
                    ? inactiveOrders.filter((order) => order.username === loggedInUser.username).map((order) => (
                      <div className="box" key={order.inactiveId}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <p>
                            Total: $
                            {(order.orders.reduce((a, b) => {
                              // eslint-disable-next-line no-param-reassign
                              a += ((b.quantity * 99) / 100);
                              return a;
                            }, 0)).toFixed(2)}
                          </p>
                          <p>{moment(order.checkoutTime).format('dddd, MMMM, Do YYYY')}</p>
                        </div>
                        <hr />
                        <div className="columns">
                          <div className="column is-third">
                            <p style={{ textDecoration: 'underline' }}>Title</p>
                          </div>
                          <div className="column is-third">
                            <p style={{ textDecoration: 'underline' }}>Quantity</p>
                          </div>
                          <div className="column is-third">
                            <p style={{ textDecoration: 'underline' }}>Price</p>
                          </div>
                        </div>
                        {
                          order.orders.map((purchase) => (
                            <div key={purchase.id} className="columns">
                              <div className="column is-third">
                                <p>{ purchase.name }</p>
                              </div>
                              <div className="column is-third">
                                <p>{ purchase.quantity }</p>
                              </div>
                              <div className="column is-third">
                                <p>
                                  $
                                  { (purchase.quantity * 99) / 100 }
                                </p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ))
                    : 'Previous orders? As if!'
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

UserAccount.propTypes = {
  changeUserName: propTypes.func.isRequired,
  loggedInUser: propTypes.shape({}).isRequired,
  getMovies: propTypes.func.isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
  adminPreviousOrders: propTypes.func.isRequired,
  inactiveOrders: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.loggedInUser,
  users: state.userReducer.users,
  movies: state.movieReducer.movies,
  userPreviousReviews: state.userReducer.userPreviousReviews,
  inactiveOrders: state.cartReducer.inactiveOrders,
});

const mapDispatchToProps = {
  changeUserName,
  getUserPreviousReviews,
  getMovies,
  adminPreviousOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
