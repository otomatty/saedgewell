import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import styles from './BackgroundVideo.module.css';

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(50%);
`;

interface BackgroundVideoProps {
  src: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.playbackRate = 1; // 再生速度を2倍に設定
    }
  }, [isVideoLoaded]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className={styles.videoContainer}>
      <Video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        onLoadedData={handleVideoLoaded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
    </div>
  );
};

export default BackgroundVideo;
