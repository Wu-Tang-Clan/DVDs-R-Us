import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovies } from '../redux/movies/actions';
import { generateGenres, movieFilter } from '../utilities';

class Browse extends Component {

    state = {
        filter: 'All',
        sort: 'A-Z',
        genres: [],
        sortMethods: ['A-Z', 'Z-A', 'Highest Rated', 'Lowest Rated', 'Released (Most Recent)', 'Released (Oldest)']
    }

    async componentDidMount() {
        await this.props.getMovies();
        this.setState({
            genres: generateGenres(this.props.movies)
        })
    }

    render() {
        const { filter, sort, genres, sortMethods } = this.state;
        let { movies } = this.props;
        const { path } = this.props.props.match;
        movies = movieFilter(movies, filter, sort);
        return (
            <div>
                {
                    (movies.length) ?
                    <div>
                        <div>
                            <select onChange={(e) => this.setState({sort: e.target.value})}>
                                {
                                    sortMethods.map(method => <option key={ method } value={ method }>{ method }</option>)
                                }
                            </select>
                            <select onChange={(e) => this.setState({filter: e.target.value})}>
                                <option value='All'>All</option>
                                {
                                    genres.map(genre => <option key={ genre } value={ genre }>{ genre }</option>)
                                }
                            </select>
                        </div>
                        <ul>
                            {
                                movies.map(movie => {
                                    return (
                                    <li key={ movie.id }><Link to={ `${path}/${movie.id}` }>{ movie.title } ({ movie.year })</Link></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        movies: state.movieReducer.movies
    }
}

const mapDispatchToProps = { getMovies };

export default connect(mapStatetoProps, mapDispatchToProps)(Browse);