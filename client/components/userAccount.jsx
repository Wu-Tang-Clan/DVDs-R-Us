/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { changeUserName } from '../redux/users/actions';

class UserAccount extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    username: '',
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
    return (
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
    );
  }
}

UserAccount.propTypes = {
  changeUserName: propTypes.func.isRequired,
  loggedInUser: propTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.userReducer.loggedInUser,
  users: state.userReducer.users,

});

const mapDispatchToProps = { changeUserName };

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
