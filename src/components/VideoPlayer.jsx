import React, { useRef, useState, useEffect, useCallback } from 'react';
import styles from './VideoPlayer.module.css';
import VideoOverlay from './VideoOverlay';
import { Play } from 'lucide-react';

const VideoPlayer = ({ video, index }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Can play immediately with sound because the user "Starts" the app with a click
  
  const lastTapRef = useRef(0);
  const longPressTimerRef = useRef(null);
  
  // Intersection Observer for auto-playing videos when they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          
          if (entry.isIntersecting) {
            // Video is in view - attempt to play
            videoRef.current.currentTime = 0; // consistent start
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch((err) => {
                  console.log("Autoplay prevented or interrupted:", err);
                  setIsPlaying(false);
                });
            }
          } else {
            // Video is out of view - pause
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 } // Needs to be 60% visible to trigger
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress || 0);
  };

  // Keyboard controls listener specifically for this video when active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isPlaying) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isPlaying) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Handle pointer down (starting a long press potential)
  const handlePointerDown = (e) => {
    longPressTimerRef.current = setTimeout(() => {
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
      }
    }, 500); // 500ms holds pause the video
  };

  const handlePointerUp = (e) => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    // If it was playing initially and we paused it via long press, resume
    if (isPlaying && videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    }
  };

  const handlePointerCancel = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
  };

  // Click handler multiplexing (Tap vs Double Tap)
  const handleClick = (e) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_PRESS_DELAY) {
      // It's a double tap
      handleDoubleTap();
      // Reset tap to prevent triple click issues
      lastTapRef.current = 0;
    } else {
      // Wait to see if it becomes a double tap, if not it's single
      lastTapRef.current = now;
      setTimeout(() => {
        if (lastTapRef.current === now) {
          togglePlay();
        }
      }, DOUBLE_PRESS_DELAY);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      triggerPlayIconBurst();
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayIcon(false); // remove it instantly if it was there
    }
  };

  const handleDoubleTap = () => {
    setIsLiked(true);
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const triggerPlayIconBurst = () => {
    setShowPlayIcon(true);
    setTimeout(() => setShowPlayIcon(false), 800);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if(videoRef.current) {
        videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className={styles.playerContainer} ref={containerRef}>
      <video
        ref={videoRef}
        className={styles.videoElement}
        src={video.url}
        loop
        playsInline // Important for iOS
        muted={isMuted} // Initialize with local state
        onTimeUpdate={handleTimeUpdate}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      />
      
      {/* Central Animations */}
      {showPlayIcon && (
        <div className={styles.playPauseIndicator}>
          <Play size={40} fill="white" />
        </div>
      )}

      {showHeartAnim && (
        <div className={styles.bigHeart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
      )}

      {/* Overlay UI Layer */}
      <VideoOverlay 
        video={video} 
        isPlaying={isPlaying} 
        progress={progress}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />
    </div>
  );
};

export default VideoPlayer;
