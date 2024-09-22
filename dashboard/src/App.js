import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './header';
import TinderCards from './TinderCards';
import SignInRedirect from './SignInRedirect'; // To be created
import SignUpRedirect from './SignUpRedirect'; // To be created
import NotFoundPage from './NotFoundPage'; // To be created
import SwipeButtons from './SwipeButtons';
import styles from './App.module.css';
function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            <SignedIn>
              <>
                <TinderCards />
                <SwipeButtons />
              </>
            </SignedIn>
          }
        />

        {/* Public Routes */}
        <Route path="/sign-in" element={<SignInRedirect />} />
        <Route path="/sign-up" element={<SignUpRedirect />} />

        {/* Catch-all Route */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </div>
  );
}
export default App;