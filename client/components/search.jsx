import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getMovies } from '../redux/movies/actions';
import { movieFilter } from '../utilities';
import singleMovieBox from './singleMovieBox';

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

  handleSearchTermChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSearchCriteriaChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSearch(ev) {
    ev.preventDefault();
    const { searchTerm, searchCriteria } = this.state;
    this.searchMovies(searchTerm, searchCriteria);
  }

  searchMovies(searchTerm, searchCriteria) {
    let { movies } = this.props;
    movies = movieFilter(movies, searchCriteria, 'A-Z', searchTerm);
    this.setState({ searchedMovies: movies });
  }

  render() {
    const { searchTerm, searchCriteria, searchedMovies } = this.state;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="searchTerm"> Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Enter Your Search Term Here"
              value={searchTerm}
              name="searchTerm"
              onChange={(ev) => this.handleSearchTermChange(ev)}
            />
          </div>
          <div>
            <label htmlFor="searchCriteria">Search Criteria:</label>
            <select
              value={searchCriteria}
              id="searchCriteria"
              name="searchCriteria"
              onChange={(ev) => this.handleSearchCriteriaChange(ev)}
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
          </div>
          <button type="button" onClick={(ev) => this.handleSearch(ev)}>
            Search
          </button>
        </form>

        <ul>
          {
          searchedMovies
            ? searchedMovies.map((movie) => (
              singleMovieBox(movie)
            ))
            : null
             }
        </ul>
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
