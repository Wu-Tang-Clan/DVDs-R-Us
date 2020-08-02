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
    console.log('USERNAME', username, 'PASSWORD', password);
    await login(username, password, history);
  }

  render() {
    const { username, password } = this.state;
    const { onSubmit } = this;
    return (
      <div className="box">
        <form onSubmit={onSubmit}>
          <label>
            Username:
            <input
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
              type="text"
            />
          </label>
          <label>
            Password:
            <input
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
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
