"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPlayerWithAdProps {
  adVideoUrl: string;
  contentVideoUrl: string;
}

const VideoPlayerWithAd: React.FC<VideoPlayerWithAdProps> = ({ adVideoUrl, contentVideoUrl }) => {
  const [isClient, setIsClient] = useState(false);
  const [showAd, setShowAd] = useState(true);
  const [adElapsed, setAdElapsed] = useState(0);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setShowAd(true);
    setAdElapsed(0);
    setCanSkip(false);
  }, []);

  useEffect(() => {
    if (adElapsed >= 5) {
      setCanSkip(true);
    }
  }, [adElapsed]);

  const handleAdProgress = (state: { playedSeconds: number }): void => {
    setAdElapsed(state.playedSeconds);
  };

  const handleSkipAd = (): void => {
    setShowAd(false);
  };

  if (!isClient) return null; // or a loading placeholder

  return (
    <div className="video-player-container">
      {showAd ? (
        <div className="ad-container">
          <ReactPlayer
            url={adVideoUrl}
            playing
            controls={false}
            onProgress={handleAdProgress}
            width="100%"
            height="100%"
          />
          {canSkip && (
            <button className="skip-button" onClick={handleSkipAd}>
              Skip Ad
            </button>
          )}
        </div>
      ) : (
        <ReactPlayer
          url={contentVideoUrl}
          playing
          controls
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default VideoPlayerWithAd;