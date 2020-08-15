/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { LoopCircleLoading } from 'react-loadingg';

// eslint-disable-next-line react/prefer-stateless-function
class LogOut extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    const { props: { history } } = this.props;
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }

  render() {
    return (
      <div className="box" style={{ marginTop: '3.75rem', height: '200px' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px',
        }}
        >
          <p className="title is-4">Boo ya! Thanks for stopping by!</p>
          <p className="subtitle is-5">Redirecting you back to home...</p>
          <div style={{ marginTop: '10px' }}>
            <LoopCircleLoading style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default LogOut;
