/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { LoopCircleLoading } from 'react-loadingg';

// eslint-disable-next-line react/prefer-stateless-function
class LogOut extends Component {
  componentDidMount() {
    const { props: { history } } = this.props;
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px',
      }}
      >
        <p className="title is-4">Thank you for Shopping!</p>
        <p className="subtitle is-5">Redirecting you back to home...</p>
        <div style={{ marginTop: '10px' }}>
          <LoopCircleLoading style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        </div>
      </div>
    );
  }
}

export default LogOut;
