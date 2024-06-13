import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import styles from "./BackgroundVideo.module.css";

const Video = styled.video<{ duration: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(50%);
  ${({ duration }) => duration}s infinite;
`;

const BackgroundVideo: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(10); // デフォルトのアニメーション時間
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.playbackRate = 2; // 再生速度を0.5倍に設定
    }
  }, [isVideoLoaded]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setAnimationDuration(duration);
    }
  };

  return (
    <div className={styles.videoContainer}>
      <Video
        ref={videoRef}
        duration={animationDuration}
        autoPlay
        muted
        playsInline
        loop
        onLoadedData={handleVideoLoaded}
      >
        <source src="/fuji.webm" type="video/webm" />
        Your browser does not support the video tag.
      </Video>
      {!isVideoLoaded && (
        <div className={styles.placeholder}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <circle cx="50" cy="50" r="10">
              <animate
                attributeName="r"
                from="10"
                to="40"
                dur="1s"
                repeatCount="indefinite"
                begin="0s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                repeatCount="indefinite"
                begin="0s"
                fill="freeze"
              />
            </circle>
            <circle cx="50" cy="50" r="10">
              <animate
                attributeName="r"
                from="10"
                to="40"
                dur="1s"
                repeatCount="indefinite"
                begin="0.5s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1s"
                repeatCount="indefinite"
                begin="0.5s"
                fill="freeze"
              />
            </circle>
          </svg>
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;
