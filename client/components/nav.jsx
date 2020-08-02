/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { loginCheck, logOut } from '../redux/users/actions';

class Nav extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { loginCheck } = this.props;

    loginCheck();
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { loggedIn, loggedInUser, logOut } = this.props;
    return (
      <div>
        <nav>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <p className="title is-5">{ loggedIn ? `Hello ${loggedInUser.username}!` : 'Hello Guest! Please login!'}</p>
              {
                loggedIn
                  ? <button onClick={logOut} className="button" type="button">Log Out</button>
                  : <Link className="button" to="/login">Login</Link>
              }
            </div>
            <div className="navDiv">
              <Link to="/about" style={{ color: 'white' }}>
                About
              </Link>
              <Link to="/search" style={{ color: 'white' }}>
                Search
              </Link>
              <Link to="/browse" style={{ color: 'white' }}>
                Browse
              </Link>
              <Link to="/yourOrders" style={{ color: 'white' }}>
                Your Orders
              </Link>
              <Link to="/cart" style={{ color: 'white' }}>
                Cart
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {
  loggedIn: propTypes.bool.isRequired,
  // loggedInUser: propTypes.shape({ username: propTypes.string.isRequired }).isRequired,
  loggedInUser: propTypes.shape({}).isRequired,
  loginCheck: propTypes.func.isRequired,
  logOut: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  loggedInUser: state.userReducer.loggedInUser,
});

const mapDispatchToProps = { loginCheck, logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
