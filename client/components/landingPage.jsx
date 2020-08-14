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
    {/* <h3 className="dreams">Only Playing</h3> */}
    <figure className="image is-128by128">
      <img style={{ padding: '75px' }} src={insideBlockbuster} alt="inside-blockbuster" />
    </figure>
    <div className="box">
      <p className="title is-5" style={{ color: 'white', textAlign: 'center' }}>
        The days of "Be Kind, Rewind" are OVER
      </p>
      <p className="title is-4" style={{ color: 'white', textAlign: 'center' }}>
        This is DVD
      </p>
    </div>
  </div>
);

export default landingPage;
