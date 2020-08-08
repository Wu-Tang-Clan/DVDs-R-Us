/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  getMovies, searchImdb, orderStock, removeMovie,
} from '../redux/movies/actions';
import { getUsers } from '../redux/users/actions';
import { adminInventoryFilter } from '../utilities';

// eslint-disable-next-line react/prefer-stateless-function
class Admin extends Component {
  state = {
    searchInput: '',
    stockSearch: '',
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getMovies, getUsers } = this.props;
    getMovies();
    getUsers();
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

  handleOrder = async (e) => {
    // eslint-disable-next-line no-shadow
    const { orderStock } = this.props;
    await orderStock(e.target.value);
    // eslint-disable-next-line no-alert
    alert('Movie is now added to inventory!');
  }

  handleRemoveMovie = async (e) => {
    // eslint-disable-next-line no-shadow
    const { removeMovie } = this.props;
    await removeMovie(e.target.value);
    // eslint-disable-next-line no-alert
    alert('Movie is now removed from inventory!');
  };

  render() {
    const { searchInput, stockSearch } = this.state;
    // console.log(stockSearch);
    const { handleSubmit, handleOrder, handleRemoveMovie } = this;
    const { users, imdbSearchResults } = this.props;
    let { movies } = this.props;
    movies = adminInventoryFilter(movies, stockSearch);
    return (
      <div className="box">
        <div className="columns is-multiline">
          <div className="column is-half">
            <label htmlFor="movieBox1" className="label">Movies In Stock</label>
            <input onChange={(e) => this.setState({ stockSearch: e.target.value })} value={stockSearch} type="input" placeholder="Search Inventory" className="input" />
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
                      </div>
                      <div className="column is-one-quarter">
                        <button type="button" value={movie.id} onClick={handleRemoveMovie} className="button is-link">Remove Movie</button>
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
                    <label className="label" htmlFor="imdbSearch">Add New Movies</label>
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
                  className="button is-link"
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
                          <button onClick={handleOrder} className="button is-link" type="button" value={movie.imdbid}>Order Stock</button>
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
            <div className="adminBox">
              {
              users
                ? users.map((user) => <p key={user.id}>{ user.username }</p>)
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
  imdbSearchResults: propTypes.arrayOf(propTypes.object).isRequired,
  getUsers: propTypes.func.isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
  users: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movieReducer.movies,
  users: state.userReducer.users,
  imdbSearchResults: state.movieReducer.imdbSearchResults,
});

const mapDispatchToProps = {
  getMovies, getUsers, searchImdb, orderStock, removeMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
