/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/state-in-constructor */
/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { loginCheck, logOut } from '../redux/users/actions';
import bloccBusterV3 from '../assets/images/bloccBusterV3.jpg';

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
          style={{
            backgroundColor: '#1030AD',
            color: '#ffcc00',
            width: '100%',
          }}
          className="navbar is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item" href="# ">
              <img
                alt=""
                src={bloccBusterV3}
                width="112"
                height="50"
              />
            </a>

            <div
              onClick={() => {
                const toggle = document.querySelector('.nav-toggle');
                const menu = document.querySelector('.navbar-menu');
                toggle.classList.toggle('is-active');
                menu.classList.toggle('is-active');
              }}
              onKeyDown={() => {}}
              role="button"
              className="navbar-burger burger nav-toggle"
              aria-label="menu"
              aria-expanded="false"
              data-target="bloccbusterNavBar"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
          </div>

          <div id="bloccbusterNavBar" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/search" className="navbar-item">
                <i style={{ marginRight: '5px' }} className="fa fa-search" />
                Search
              </Link>
              <Link to="/browse" className="navbar-item">
                <i style={{ marginRight: '5px' }} className="fa fa-sort" />
                Browse
              </Link>
              <Link to="/cart" className="navbar-item">
                <i style={{ marginRight: '5px' }} className="fa fa-shopping-cart" />
                {' '}
                Cart
              </Link>
              {loggedIn ? (
                <Link
                  className="navbar-item"
                  to={`/useraccount/${loggedInUser.id}`}
                >
                  <i style={{ marginRight: '5px' }} className="fa fa-address-card" />
                  My Account
                </Link>
              ) : null}
              {loggedInUser.isAdmin ? (
                <Link className="navbar-item" to={`/admin/${loggedInUser.id}`}>
                  Admin
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
                    <p className="is-size-6" style={{ marginBottom: '5px', marginRight: '5px' }}>
                      {loggedIn
                        ? `Hello ${loggedInUser.username}!`
                        : 'Hello Guest! Please login or signup!'}
                    </p>
                  </div>
                  {loggedIn ? (
                    <button
                      onClick={() => logOut(history)}
                      className="button brandButton"
                      type="button"
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      className="button brandButton"
                      to="/login"
                      style={{ margin: '5px 10px', marginBottom: '4px' }}
                    >
                      <strong>Login</strong>
                    </Link>
                  )}

                  {!loggedIn ? (
                    <Link
                      className="button brandButton"
                      to="/signup"
                      style={{ margin: '5px 10px', marginBottom: '4px' }}
                    >
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
  loggedInUser: propTypes.shape({}).isRequired,
  loginCheck: propTypes.func.isRequired,
  logOut: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
  loggedInUser: state.userReducer.loggedInUser,
  orders: state.cartReducer.orders,
});

const mapDispatchToProps = { loginCheck, logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
