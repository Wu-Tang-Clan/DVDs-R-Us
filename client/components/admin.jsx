/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/state-in-constructor */
import Alert from 'react-s-alert';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import moment from 'moment';
import {
  getMovies, searchImdb, orderStock, removeMovie, addStock,
} from '../redux/movies/actions';
import { getUsers, toggleAdmin } from '../redux/users/actions';
import { adminPreviousOrders } from '../redux/cart/actions';
import { adminInventoryFilter } from '../utilities';

// eslint-disable-next-line react/prefer-stateless-function
class Admin extends Component {
  state = {
    searchInput: '',
    stockSearch: '',
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // eslint-disable-next-line no-shadow
    const {
      getMovies, getUsers, adminPreviousOrders, movies,
    } = this.props;
    adminPreviousOrders();
    getMovies();
    getUsers();
    const lowStock = [];
    movies.forEach((movie) => {
      if (movie.stock <= 10) {
        lowStock.push(movie.title);
      }
    });
    if (lowStock.length) {
      Alert.warning(`The following movies are running low: ${lowStock.join(', ')}`, {
        position: 'top',
        timeout: 'none',
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    const { searchImdb } = this.props;
    const { searchInput } = this.state;
    await searchImdb(searchInput);
    this.setState({
      searchInput: '',
    });
  }

  handleOrder = async (e, title) => {
    // eslint-disable-next-line no-shadow
    const { orderStock } = this.props;
    await orderStock(e.target.value, title);
    // eslint-disable-next-line no-alert
  }

  handleRemoveMovie = async (e, title) => {
    // eslint-disable-next-line no-shadow
    const { removeMovie } = this.props;
    await removeMovie(e.target.value, title);
  };

  toggleAdminRole = async (userId, userName, isAdmin) => {
    // eslint-disable-next-line no-shadow
    const { toggleAdmin } = this.props;
    await toggleAdmin(userId, userName, isAdmin);
  };

  render() {
    const { searchInput, stockSearch } = this.state;
    const {
      handleSubmit, handleOrder, handleRemoveMovie, toggleAdminRole,
    } = this;
    const {
      users, imdbSearchResults, inactiveOrders, addStock,
    } = this.props;
    let { movies } = this.props;
    movies = adminInventoryFilter(movies, stockSearch);
    return (
      <div style={{ marginTop: '3.75rem' }} className="box">
        <div className="columns is-multiline">
          <div className="column is-half">
            <label htmlFor="movieBox1" className="label title is-4">Movies In Stock</label>
            <input onChange={(e) => this.setState({ stockSearch: e.target.value })} value={stockSearch} style={{ marginBottom: '5px' }} type="input" placeholder="Search Inventory" className="input" />
            <div id="movieBox1" className="adminBox">
              {
              movies
                ? movies.map((movie) => (
                  <div key={movie.id} style={{ padding: '30px' }} className="box">
                    <div className="columns">
                      <div className="column is-one-quarter">
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
                        <p className="title is-6">
                          Stock:
                          {' '}
                          {movie.stock}
                        </p>
                      </div>
                      <div className="column is-one-quarter">
                        <button
                          type="button"
                          value={movie.id}
                          onClick={(e) => handleRemoveMovie(e, movie.title)}
                          style={{ margin: '10px' }}
                          className="button brandButton"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="column is-one-quarter">
                        <button
                          type="button"
                          value={movie.id}
                          onClick={() => addStock(movie.id)}
                          style={{ margin: '10px' }}
                          className="button brandButton"
                        >
                          Add Stock
                        </button>
                      </div>
                    </div>
                  </div>
                ))
                : null
            }
            </div>
          </div>
          <div className="column is-half">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <div className="control">
                    <label className="label title is-4" htmlFor="imdbSearch">Add New Movies</label>
                    <input
                      id="imdbSearch"
                      onChange={(e) => this.setState({ searchInput: e.target.value })}
                      type="text"
                      placeholder="Search Movies To Order"
                      className="input"
                      style={{ width: '100%' }}
                      value={searchInput}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="button brandButton"
                >
                  Search
                </button>
              </form>
            </div>
            <div className="adminBox">
              {
                imdbSearchResults
                  ? imdbSearchResults.map((movie) => (
                    <div className="box" style={{ padding: '30px' }} key={movie.imdbid}>
                      <div className="columns">
                        <div className="column is-one-quarter">
                          <div className="image is-48x48">
                            <img src={movie.poster} alt="movie poster" />
                          </div>
                        </div>
                        <div className="column is-one-quarter">
                          <p className="title is-6">
                            {movie.title}
                            {' '}
                            (
                            {movie.year}
                            )
                          </p>
                        </div>
                        <div className="column is-one-quarter">
                          <button onClick={(e) => handleOrder(e, movie.title)} className="button brandButton" type="button" value={movie.imdbid}>Order Stock</button>
                        </div>
                      </div>
                    </div>
                  ))
                  : null
              }
            </div>
          </div>
          <div className="column is-half">
            <p className="title is-4">Manage Users</p>

            <div id="movieBox1" className="adminBox">
              {
              users
                ? users
                  .filter((user) => user.username !== 'admin')
                  .sort((a, b) => (a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1))
                  .map((user) => (
                    <div key={user.id} style={{ padding: '30px' }} className="box">
                      <div className="columns">
                        <div className="column is-one-half">
                          <div className="label">
                            {user.username}
                          </div>
                        </div>
                        <div className="column is-one-half">
                          {user.isAdmin ? (
                            <button
                              type="submit"
                              className="button brandButton"
                              onClick={() => toggleAdminRole(user.id, user.username, !user.isAdmin)}
                            >
                              Remove Admin
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="button brandButton"
                              onClick={() => toggleAdminRole(user.id, user.username, !user.isAdmin)}
                            >
                              Set As Admin
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                : null
            }
            </div>
          </div>
          <div className="column is-half">
            <p className="title is-4">Previous Orders</p>
            <div className="adminBox">
              {
               inactiveOrders.length
                 ? inactiveOrders
                   .sort((a, b) => (a.checkoutTime < b.checkoutTime ? 1 : -1))
                   .map((order) => (
                     <div className="box" key={order.inactiveId}>
                       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <p>
                           {order.username}
                           : $
                           {(order.orders.reduce((a, b) => {
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
                             <p>{ purchase.name}</p>
                           </div>
                           <div className="column is-third">
                             <p>{ purchase.quantity}</p>
                           </div>
                           <div className="column is-third">
                             <p>
                               $
                               { ((purchase.quantity * 99) / 100).toFixed(2) }
                             </p>
                           </div>
                         </div>
                       ))
                     }
                     </div>
                   ))
                 : null
             }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  getMovies: propTypes.func.isRequired,
  orderStock: propTypes.func.isRequired,
  searchImdb: propTypes.func.isRequired,
  removeMovie: propTypes.func.isRequired,
  toggleAdmin: propTypes.func.isRequired,
  addStock: propTypes.func.isRequired,
  inactiveOrders: propTypes.arrayOf(propTypes.object).isRequired,
  adminPreviousOrders: propTypes.func.isRequired,
  imdbSearchResults: propTypes.arrayOf(propTypes.object).isRequired,
  getUsers: propTypes.func.isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
  users: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movieReducer.movies,
  users: state.userReducer.users,
  imdbSearchResults: state.movieReducer.imdbSearchResults,
  inactiveOrders: state.cartReducer.inactiveOrders,
});

const mapDispatchToProps = {
  getMovies,
  getUsers,
  searchImdb,
  orderStock,
  removeMovie,
  toggleAdmin,
  adminPreviousOrders,
  addStock,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
