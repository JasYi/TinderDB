"use client";

import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <h2>404 - Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default NotFoundPage;
