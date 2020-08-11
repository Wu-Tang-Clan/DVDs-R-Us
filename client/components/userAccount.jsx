/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { changeUserName, getUserPreviousReviews } from '../redux/users/actions';
import { getMovies } from '../redux/movies/actions';

class UserAccount extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    username: '',
  }

  async componentDidMount() {
    const { getMovies, getUserPreviousReviews, loggedInUser } = this.props;
    await getUserPreviousReviews(loggedInUser.id);
    await getMovies();
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
    const { userPreviousReviews } = this.props;
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

              <button className="button brandButton" type="submit">Change UserName</button>
            </form>
            <div className="column is-one-third" />
          </div>
        </div>

        <div style={{ marginTop: '3.75rem' }} className="box">
          <div className="columns is-multiline">
            <div className="column is-half">
              <p className="title is-4">My Previous Reviews</p>
              <div id="movieBox1" className="adminBox">
                {userPreviousReviews && userPreviousReviews.length !== 0
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
};

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.loggedInUser,
  users: state.userReducer.users,
  movies: state.movieReducer.movies,
  userPreviousReviews: state.userReducer.userPreviousReviews,

});

const mapDispatchToProps = { changeUserName, getUserPreviousReviews, getMovies };

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
