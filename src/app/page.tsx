import React from 'react';
import VideoPlayerWithAd from '../components/VideoPlayerWithAd';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Video Player with Ad</h1>
      <VideoPlayerWithAd
        adVideoUrl="https://youtu.be/QohH89Eu5iM"
        contentVideoUrl="https://youtu.be/TXtnFw9eDmM"
      />
    </div>
  );
};

export default Home;