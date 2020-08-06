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
    const {
      // eslint-disable-next-line no-shadow
      loggedIn,
      loggedInUser,
      // eslint-disable-next-line no-shadow
      logOut,
      props: { history },
    } = this.props;
    return (
      <div>
        <nav
          className="navbar is-link"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="# ">
              <img
                alt=""
                src=""
                width="100"
                height="28"
              />
            </a>

            <a
              href="# "
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/about" className="navbar-item">
                About
              </Link>

              <Link to="/search" className="navbar-item">
                Search
              </Link>
              <Link to="/browse" className="navbar-item">
                Browse
              </Link>
              <Link to="/yourOrders" className="navbar-item">
                Your Orders
              </Link>
              <Link to="/cart" className="navbar-item">
                Cart
              </Link>
              {loggedInUser.isAdmin ? (
                <Link className="navbar-item" to={`/admin/${loggedInUser.id}`}>
                  Admin
                </Link>
              ) : null}
              {loggedIn ? (
                <Link
                  className="navbar-item"
                  to={`/myaccount/${loggedInUser.id}`}
                >
                  My Account
                </Link>
              ) : null}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <p className="is-size-6" style={{ marginBottom: '5px' }}>
                      {loggedIn
                        ? `Hello ${loggedInUser.username}!`
                        : 'Hello Guest! Please login or signup!'}
                    </p>
                  </div>
                  {loggedIn ? (
                    <button
                      onClick={() => logOut(history)}
                      className="button is-primary"
                      type="button"
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      className="button is-primary"
                      to="/login"
                      style={{ margin: '5px 10px' }}
                    >
                      <strong>Login</strong>
                    </Link>
                  )}

                  {!loggedIn ? (
                    <Link className="button is-primary" to="/signup">
                      <strong>Sign up</strong>
                    </Link>
                  ) : null}
                </div>
              </div>
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
