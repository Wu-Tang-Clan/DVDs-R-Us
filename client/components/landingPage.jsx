/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Bounce from 'react-reveal/Bounce';
import insideBlockbuster from '../assets/images/insideBlockbuster.jpg';

const landingPage = () => (
  <div
    className="box"
    style={{ marginTop: '3.75rem' }}
  >
    <Bounce left>
      <h1 className="chrome">No Rewinding</h1>
    </Bounce>
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: '20px',
    }}
    >
      <div style={{ display: 'flex' }}>
        <p className="title is-5 animation1">
          The days of "Be Kind, Rewind" are OVER
        </p>
        <p className="title is-5 animation2" style={{ marginLeft: '5px' }}>
          This is DVD
        </p>
        <p className="title is-5 animation3" style={{ marginLeft: '5px' }}>
          This is BLOCCBUSTER
        </p>
      </div>

    </div>
    <figure className="image is-128by128">
      <img style={{ padding: '20px' }} src={insideBlockbuster} alt="inside-blockbuster" />
    </figure>
  </div>
);

export default landingPage;
