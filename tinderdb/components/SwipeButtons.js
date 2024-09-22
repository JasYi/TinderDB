"use client";

import React, { useRef } from "react";
import { IconButton } from "@mui/material";
import {
  Replay,
  Close,
  StarRate,
  Favorite,
  FlashOn,
} from "@mui/icons-material";
import styles from "./SwipeButtons.module.css";

function SwipeButtons({ swipeLeft, swipeRight }) {
  return (
    <div className={styles.swipeButtons}>
      <IconButton className={styles.swipeButton} onClick={swipeLeft}>
        <Close fontSize="large" />
      </IconButton>
      <IconButton className={styles.swipeButton} onClick={swipeRight}>
        <Favorite fontSize="large" />
      </IconButton>
    </div>
  );
}
export default SwipeButtons;
