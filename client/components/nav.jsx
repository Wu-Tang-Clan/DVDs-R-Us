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
      loggedIn, loggedInUser, logOut, props: { history },
    } = this.props;
    return (
      <div>
        <nav>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <p className="is-size-6" style={{ marginBottom: '5px' }}>{ loggedIn ? `Hello ${loggedInUser.username}!` : 'Hello Guest! Please login or signup!'}</p>
              </div>
              {
                loggedIn
                  ? <button onClick={() => logOut(history)} className="button" type="button" style={{ margin: '5px 10px' }}>Log Out</button>
                  : <Link className="button is-link" to="/login" style={{ margin: '5px 10px' }}>Login</Link>
              }
              {
                !loggedIn
                  ? <Link className="button is-link" to="/signup" style={{ margin: '5px 10px' }}>Sign-Up</Link>
                  : null
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
              {
                loggedInUser.isAdmin
                  ? (
                    <Link style={{ color: 'white' }} to={`/admin/${loggedInUser.id}`}>
                      Admin
                    </Link>
                  )
                  : null
              }
              {
                loggedIn
                  ? (
                    <Link style={{ color: 'white' }} to={`/myaccount/${loggedInUser.id}`}>
                      My Account
                    </Link>
                  )
                  : null
              }
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
