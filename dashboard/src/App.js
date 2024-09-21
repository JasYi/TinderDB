import React from 'react';
import Header from './header';
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';
import TestTinderCard from './TestTinderCard';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <TinderCards />
      <TestTinderCard />
      <SwipeButtons />
    </div>
  );
}

export default App;