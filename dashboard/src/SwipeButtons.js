import React,{useRef} from 'react';
import { IconButton } from '@mui/material';
import { Replay, Close, StarRate, Favorite, FlashOn } from '@mui/icons-material';
import styles from './SwipeButtons.module.css';

function SwipeButtons() {
  const childRefs = useRef([]);

  const swipe = (dir) => {
    // Trigger the swipe action on the top card
    if (childRefs.current[0]) {
      childRefs.current[0].swipe(dir);
    }
  };

  return (
    <div className={styles.swipeButtons}>
      <IconButton className={styles.swipeButton} onClick={() => swipe('left')}>
        <Replay fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButton} onClick={() => swipe('left')}>
        <Close fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButton} onClick={() => swipe('up')}>
        <StarRate fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButton} onClick={() => swipe('right')}>
        <Favorite fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButton} onClick={() => swipe('down')}>
        <FlashOn fontSize="large" />
      </IconButton>
    </div>
  );
}


export default SwipeButtons;