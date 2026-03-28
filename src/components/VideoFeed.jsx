import React, { useState, useEffect, useRef } from 'react';
import styles from './VideoFeed.module.css';
import VideoPlayer from './VideoPlayer';

const VideoFeed = ({ videos }) => {
  const containerRef = useRef(null);
  
  // To implement "infinite" scrolling, we'll keep appending videos when near the end
  const [feedVideos, setFeedVideos] = useState([...videos, ...videos]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current) return;
      
      const { clientHeight, scrollTop } = containerRef.current;
      const currentIndex = Math.round(scrollTop / clientHeight);
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          containerRef.current.scrollTo({
            top: (currentIndex - 1) * clientHeight,
            behavior: 'smooth'
          });
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        containerRef.current.scrollTo({
          top: (currentIndex + 1) * clientHeight,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Infinite scroll listener
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // If we're near the bottom, append more videos seamlessly
    if (scrollHeight - scrollTop <= clientHeight * 2) {
      setFeedVideos(prev => [...prev, ...videos]);
    }
  };

  return (
    <div 
      className={styles.feedContainer} 
      ref={containerRef}
      onScroll={handleScroll}
    >
      {feedVideos.map((video, index) => (
        <VideoPlayer 
          key={`${video.id}-${index}`} 
          video={video} 
          index={index}
        />
      ))}
    </div>
  );
};

export default VideoFeed;
