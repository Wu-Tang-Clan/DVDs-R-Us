/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getMovies } from '../redux/movies/actions';
import { searchMovieFilter } from '../utilities';
import SingleMovieBox from './singleMovieBox';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      searchCriteria: 'title',
      searchedMovies: [],
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { getMovies } = this.props;
    await getMovies();
  }

  render() {
    const { searchTerm, searchCriteria } = this.state;
    console.log('this.state -- ', this.state);
    console.log('this.props -- ', this.props);
    const { props } = this.props;
    let { movies } = this.props;
    movies = searchMovieFilter(movies, searchCriteria, 'A-Z', searchTerm);
    console.log('after search movies are --- ', movies);
    // movies = movieFilter(movies, searchCriteria, 'A-Z', searchTerm);
    return (
      <div>
        <div style={{ marginTop: '3.75rem' }} className="box">
          <div className="columns">
            <div className="column is-one-third" />
            <form className="column is-one-third">
              <label className="label">
                Search Term:
                <input
                  className="input"
                  id="searchTerm"

                  placeholder="Enter Your Search Term Here"
                  value={searchTerm}
                  name="searchTerm"
                  onChange={(e) => this.setState({ searchTerm: e.target.value })}
                />
              </label>
              <label className="label">
                Search Criteria:
                <select
                  className="select brandButton"
                  value={searchCriteria}
                  id="searchCriteria"
                  name="searchCriteria"
                  onChange={(e) => this.setState({ searchCriteria: e.target.value })}
                >
                  <option value="actors" key="actors">
                    Actor
                  </option>
                  <option value="awards" key="awards">
                    Awards
                  </option>
                  <option value="boxoffice" key="boxoffice">
                    Boxoffice
                  </option>
                  <option value="director" key="director">
                    Director
                  </option>
                  <option value="genres" key="genres">
                    Genre
                  </option>
                  <option value="metascore" key="metascore">
                    Metascore
                  </option>
                  <option value="plot" key="plot">
                    Plot
                  </option>
                  <option value="production" key="production">
                    Production
                  </option>
                  <option value="rating" key="rating">
                    Rating
                  </option>
                  <option value="released" key="released">
                    Released
                  </option>
                  <option value="runtime" key="runtime">
                    Runtime
                  </option>
                  <option value="title" key="title">
                    Title
                  </option>
                  <option value="writer" key="writer">
                    Writer
                  </option>
                  <option value="year" key="year">
                    Year
                  </option>
                </select>
              </label>
            </form>
            <div className="column is-one-third" />
          </div>
        </div>
        <div>
          <ul>
            {
movies ? movies.length !== 0
  ? movies.map((movie) => (
    <SingleMovieBox key={movie.id} movie={movie} history={props.history} />
  ))
  : null

  : null
}
          </ul>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  getMovies: propTypes.func.isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movieReducer.movies,
});

const mapDispatchToProps = { getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
