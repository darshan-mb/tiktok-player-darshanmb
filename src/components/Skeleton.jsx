import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoArea}>
        <div className={styles.userRow}>
          <div className={`${styles.avatar} ${styles.shimmer}`} />
          <div className={`${styles.name} ${styles.shimmer}`} />
        </div>
        <div className={`${styles.desc1} ${styles.shimmer}`} />
        <div className={`${styles.desc2} ${styles.shimmer}`} />
      </div>

      <div className={styles.actionBar}>
        <div className={`${styles.actionIcon} ${styles.shimmer}`} />
        <div className={`${styles.actionIcon} ${styles.shimmer}`} />
        <div className={`${styles.actionIcon} ${styles.shimmer}`} />
        <div className={`${styles.actionIcon} ${styles.shimmer}`} />
      </div>
    </div>
  );
};

export default Skeleton;
