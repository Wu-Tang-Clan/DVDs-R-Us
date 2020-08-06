/* eslint-disable react/state-in-constructor */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getMovies } from '../redux/movies/actions';
import { loginCheck, submitReview, getReviews } from '../redux/users/actions';
import ReviewList from './reviewList';

class MoviePage extends Component {
  state = {
    quantity: 0,
    userRating: 1,
    userReview: '',
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: {
            id,
          },
        },
      },
    } = this.props;
    this.props.getMovies();
    this.props.loginCheck();
    this.props.getReviews(id);
  }

  // eslint-disable-next-line no-unused-vars
  async componentDidUpdate(prevProps, prevState) {
    const {
      getReviews,
      props: {
        match: {
          params: {
            id,
          },
        },
      },
    } = this.props;
    if (prevProps.currentMovieReviews.length !== this.props.currentMovieReviews.length) {
      await getReviews(id);
    }
  }

  reviewSubmit = async (e) => {
    e.preventDefault();
    const {
      submitReview,
      props: {
        match: {
          params: {
            id,
          },
        },
      },
    } = this.props;
    const { userReview, userRating } = this.state;
    this.setState({
      userReview: '',
      userRating: 1,
    });
    await submitReview(userReview, userRating, id);
  }

  render() {
    const {
      movies,
      loggedIn,
      currentMovieReviews,
      props: {
        history,
        match: {
          params: {
            id,
          },
        },
      },
    } = this.props;

    const movie = movies.find((selectedMovie) => selectedMovie.id === id);
    const { quantity, userRating, userReview } = this.state;
    const { reviewSubmit } = this;
    return (
      <div>
        <div
          role="presentation"
          className="backLink"
          onClick={() => history.goBack()}
          onKeyDown={() => history.goBack()}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '5px',
          }}
        >
          <li className="fa fa-backward" aria-hidden="true" />
          <p>Back</p>
        </div>
        {
          (movie)
            ? (
              <div className="box">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p className="title is-3">
                    {movie.title}
                    {' '}
                    (
                    {movie.year}
                    )
                  </p>
                  <p className="title is-4">
                    Rating
                    {' '}
                    { movie.rating }
                  </p>
                </div>
                <div className="columns is-multiline">
                  <div className="column is-one-third">
                    <figure className="image is=4by5">
                      <img src={movie.poster} alt={`${movie.name} Poster`} />
                    </figure>
                  </div>
                  <div className="column is-two-thirds">
                    <p className="is-italic">
                      {`"${movie.plot}"`}
                    </p>
                    {
                      (movie.director.length > 1)
                        ? (
                          <p className="title is-6" style={{ marginTop: '20px' }}>
                            Directors:
                            { movie.director.join(', ')}
                          </p>
                        )
                        : (
                          <p className="title is-6" style={{ marginTop: '20px' }}>
                            Director:
                            { movie.director.join(', ')}
                          </p>
                        )
                    }
                    {
                      (movie.writer.length > 1)
                        ? (
                          <p className="title is-6" style={{ marginTop: '20px' }}>
                            Writers:
                            { movie.writer.join(', ')}
                          </p>
                        )
                        : (
                          <p className="title is-6" style={{ marginTop: '20px' }}>
                            Writer:
                            { movie.writer.join(', ')}
                          </p>
                        )
                    }
                    <p className="title is-6" style={{ marginTop: '20px' }}>
                      Starring:
                      {movie.actors.join(', ')}
                    </p>
                    <p className="title is-6" style={{ marginTop: '20px' }}>
                      Runtime:
                      {movie.runtime}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p className="subtitle is-5" style={{ marginTop: '20px' }}>
                          {`Price: $${parseFloat(movie.price).toFixed(2)}`}
                        </p>
                        <input className="input" type="number" min="1" value={quantity} onChange={(e) => this.setState({ quantity: e.target.value })} />
                        <button style={{ margin: '10px' }} className="button is-link" type="button">Add To Cart</button>
                        <button style={{ margin: '10px' }} className="button is-link" type="button">Add to Wishlist</button>
                      </div>
                    </div>
                  </div>
                  <div className="column is-half">
                    {
                      loggedIn
                        ? (
                          <div className="field" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="control">
                              <p className="title is-5">Leave a review</p>
                              <div style={{ display: 'flex' }}>
                                <select
                                  className="select"
                                  value={userRating}
                                  onChange={(e) => this.setState({
                                    userRating: Number(e.target.value),
                                  })}
                                >
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                  <option value={5}>5</option>
                                </select>
                                <p className="title is-6">
                                  {userRating}
                                  /5
                                </p>
                                <i className="fa fa-star" />
                              </div>
                            </div>
                            <form onSubmit={reviewSubmit}>
                              <div className="field">
                                <div className="control">
                                  <textarea onChange={(e) => this.setState({ userReview: e.target.value })} value={userReview} className="textarea" placeholder="What did you think of this movie?" />
                                </div>
                              </div>
                              <div className="field">
                                <div className="control">
                                  <button disabled={!userReview} className="button is-link" type="submit">Submit</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        )
                        : (
                          <div>
                            <p className="title is-5">Sign up or login to leave a review</p>
                          </div>
                        )
                    }
                  </div>
                  <div className="column is-half">
                    <div className="adminBox">
                      {
                        currentMovieReviews.length
                          ? <ReviewList reviews={currentMovieReviews} />
                          : <p className="subtitle is-6">No reviews yet...</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

MoviePage.propTypes = {
  getMovies: propTypes.func.isRequired,
  loginCheck: propTypes.func.isRequired,
  submitReview: propTypes.func.isRequired,
  currentMovieReviews: propTypes.arrayOf(propTypes.object).isRequired,
  getReviews: propTypes.func.isRequired,
  loggedIn: propTypes.bool.isRequired,
  movies: propTypes.arrayOf(propTypes.object).isRequired,
  props: propTypes.shape({
    history: propTypes.isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        id: propTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    // history: propTypes.objectOf().isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movieReducer.movies,
  loggedIn: state.userReducer.loggedIn,
  currentMovieReviews: state.userReducer.currentMovieReviews,
});

const mapDispatchToProps = {
  getMovies, loginCheck, submitReview, getReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
