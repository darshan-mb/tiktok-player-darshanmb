import React, { useState } from 'react';
import styles from './VideoOverlay.module.css';
import { 
  Heart, 
  MessageCircle, 
  Bookmark,
  Music,
  Plus,
  Check,
  Volume2,
  VolumeX
} from 'lucide-react';

const VideoOverlay = ({ 
  video, 
  isPlaying, 
  progress, 
  isLiked, 
  setIsLiked,
  isMuted,
  toggleMute
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [saves, setSaves] = useState(Math.floor(Math.random() * 500) + 10);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      setSaves(prev => prev - 1);
    } else {
      setSaves(prev => prev + 1);
    }
    setIsSaved(!isSaved);
  };

  const toggleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const handleDescriptionToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.contentArea}>
        
        {/* Bottom Left Info */}
        <div className={styles.bottomInfo}>
          <div className={styles.username}>@{video.user.name}</div>
          
          <div className={`${styles.description} ${!isExpanded ? styles.truncated : ''}`}>
            {video.description}
          </div>
          {video.description.length > 50 && (
            <button className={styles.moreBtn} onClick={handleDescriptionToggle}>
              {isExpanded ? 'less' : 'more'}
            </button>
          )}
          
          <div className={styles.musicRow}>
            <Music size={14} />
            <div className={styles.musicTextContainer}>
              <div className={styles.musicText}>{video.music}</div>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className={styles.actionBar}>
          
          {/* Avatar & Follow */}
          <div className={styles.avatarWrapper}>
            <img src={video.user.avatar} alt={video.user.name} className={styles.avatar} />
            <button 
              className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
              onClick={toggleFollow}
            >
              {isFollowing ? <Check size={12} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
            </button>
          </div>

          {/* Actions */}
          <button className={styles.actionBtn} onClick={handleLike}>
            <Heart 
              size={34} 
              className={isLiked ? styles.likedIcon : ''} 
              fill={isLiked ? "currentColor" : "transparent"} 
              strokeWidth={1.5}
            />
            <span>{formatNumber(likes)}</span>
          </button>

          <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); setShowComments(true); }}>
            <MessageCircle size={32} strokeWidth={1.5} />
            <span>{formatNumber(video.comments)}</span>
          </button>

          <button className={styles.actionBtn} onClick={handleSave}>
            <Bookmark 
              size={30} 
              className={isSaved ? styles.savedIcon : ''}
              fill={isSaved ? "currentColor" : "transparent"} 
              strokeWidth={1.5}
            />
            <span>{formatNumber(saves)}</span>
          </button>

          <button className={styles.actionBtn} onClick={(e) => e.stopPropagation()}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))" }}>
              <path d="M21 12L14 5V9C7 10 4 15 3 20C5.5 16.5 9 15 14 15V19L21 12Z" />
            </svg>
            <span>{formatNumber(video.shares)}</span>
          </button>

          <button className={styles.actionBtn} onClick={toggleMute}>
            <div className={styles.iconWrapper}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </div>
            <span>Sound</span>
          </button>
        </div>
      </div>

      {/* Spinning Music Disc */}
      <div className={`${styles.musicDisc} ${isPlaying ? styles.spinAnimation : ''}`}>
         <div className={styles.discCenter}></div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* Comments Drawer */}
      {showComments && (
        <div className={styles.commentsDrawer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.commentsHeader}>
            <h4>{formatNumber(video.comments)} comments</h4>
            <button className={styles.closeCommentsBtn} onClick={() => setShowComments(false)}>&times;</button>
          </div>
          <div className={styles.commentsList}>
            {(() => {
              const genericPhrases = ["Nice!", "🔥🔥", "I agree", "So true", "Great content", "Love this", "Can't wait for more", "Wow", "💯", "Amazing", "Thanks for sharing", "Interesting", "Mind blown 🤯"];
              
              const topComments = video.commentsList || [];
              const fillerCount = Math.max(0, video.comments - topComments.length);
              
              // We construct the list dynamically to include top contextual comments + dummy fillers
              const fullList = [...topComments];
              
              // Seed deterministically to keep generated users static across re-renders
              for (let i = 0; i < fillerCount; i++) {
                 // Create a static deterministic ID based on the video ID and comment index
                 const staticUserId = ((i + 1) * 739 + video.id * 113) % 99999;
                 
                 fullList.push({
                   id: `dummy-${video.id}-${i}`,
                   user: `user_${staticUserId.toString().padStart(4, '0')}`,
                   avatar: String.fromCharCode(65 + ((i + video.id) % 26)), // A-Z consistently
                   text: genericPhrases[(i + video.id) % genericPhrases.length],
                   time: `${((i + video.id) % 23) + 1}h`
                 });
              }

              return fullList.map((comment) => (
                <div key={comment.id} className={styles.mockComment}>
                  <img src={`https://ui-avatars.com/api/?name=${comment.avatar}&background=random`} alt="user" className={styles.commentAvatar}/>
                  <div className={styles.commentContent}>
                    <span className={styles.commentUsername}>{comment.user}</span>
                    <span className={styles.commentText}>{comment.text}</span>
                    <span className={styles.commentTime}>{comment.time}</span>
                  </div>
                </div>
              ));
            })()}
            {/* Fallback if no comments exist */}
            {video.comments === 0 && (
              <div style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>No comments yet.</div>
            )}
          </div>
          
          <div className={styles.commentInputArea}>
             <input type="text" placeholder="Add comment..." className={styles.commentInput} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoOverlay;
