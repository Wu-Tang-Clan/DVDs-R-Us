import React from 'react';
import YouTube from 'react-youtube';

const YOUTUBE_ID = 'Zc4uTz9-Q1Q';

const About = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div>
      <h2 className="title is-2" style={{ textAlign: 'center' }}>THIS IS DVD!</h2>
      <div className="box" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <YouTube videoId={YOUTUBE_ID} opts={opts} />
      </div>
    </div>
  );
};

export default About;
