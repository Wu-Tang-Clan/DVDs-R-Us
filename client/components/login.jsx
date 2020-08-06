/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../redux/users/actions';

class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: '',
//       password: '',
//     };
//     this.onSubmit = this.onSubmit.bind(this);
//   }
  // eslint-disable-next-line react/state-in-constructor
  state = {
    username: '',
    password: '',
  }

  onSubmit = async (e) => {
    // console.log('submitting!!!!');
    e.preventDefault();
    const { username, password } = this.state;
    const {
      // eslint-disable-next-line no-shadow
      login,
      // loggedIn,
      props: {
        history,
      },
    } = this.props;
    await login(username, password, history);
  }

  render() {
    const { username, password } = this.state;
    const { onSubmit } = this;
    return (
      <div className="box">
        <div className="columns">
          <div className="column is-one-third" />
          <form className="column is-one-third" onSubmit={onSubmit}>
            <label>
              Username:
              <input
                className="input"
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
                type="text"
              />
            </label>
            <label>
              Password:
              <input
                className="input"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
              />
            </label>
            <button className="button is-link" type="submit">Login</button>
          </form>
          <div className="column is-one-third" />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: propTypes.func.isRequired,
  // loggedIn: propTypes.bool.isRequired,
  // props: propTypes.shape({
  //   history: propTypes.object.isRequired,
  // }),
};

const mapStateToProps = (state) => ({
  loggedIn: state.userReducer.loggedIn,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
