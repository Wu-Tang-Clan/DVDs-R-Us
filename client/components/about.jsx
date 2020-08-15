import React, { useEffect } from 'react';
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

  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <div style={{ marginTop: '3.75rem' }}>
      <div className="box" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <YouTube videoId={YOUTUBE_ID} opts={opts} />
      </div>
    </div>
  );
};

export default About;
