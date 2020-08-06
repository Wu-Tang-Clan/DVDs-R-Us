/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { signup } from '../redux/users/actions';

class Signup extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    username: '',
    password: '',
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      signup,
      props: {
        history,
      },
    } = this.props;
    await signup(username, password, history);
  };

  render() {
    const { username, password } = this.state;
    const { onSubmit } = this;
    const { userCreated, userExists, firstTimeSignup } = this.props;
    return (
      <div className="box">
        <div className="columns">
          <div className="column" />
          <form className="column" onSubmit={onSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="input"
              id="username"
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
              type="text"
            />
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              id="password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
            />
            <button className="button is-link" type="submit">Signup</button>
          </form>
          <div className="column" />
        </div>
        <div>
          {firstTimeSignup ? (
            userCreated === true ? (
              <div style={{ width: '100%', textAlign: 'center' }}>
                User created successfully
              </div>
            ) : userExists === true ? (
              <div style={{ width: '100%', textAlign: 'center' }}>
                Username already exists! Please try again.
              </div>
            ) : (
              <div style={{ width: '100%', textAlign: 'center' }}>
                Technical error occurred.Please try again!.
              </div>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signup: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userCreated: state.userReducer.userCreated,
  userExists: state.userReducer.userExists,
  firstTimeSignup: state.userReducer.firstTimeSignup,
});

const mapDispatchToProps = { signup };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
