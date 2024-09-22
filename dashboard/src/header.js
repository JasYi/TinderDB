import React from 'react';
import { IconButton } from '@mui/material';
import { Person, Forum } from '@mui/icons-material';
import styles from './Header.module.css';
import { useClerk } from '@clerk/clerk-react';

function Header() {
  const {signOut} = useClerk();

  const handleSignOut = async () => {
    await signOut({redirectUrl: 'https://helpful-dassie-78.clerk.accounts.dev/sign-in'});
  };
  return (
    <div className={styles.header}>
      <IconButton>
        <Person className={styles.headerIcon} />
      </IconButton>
      <img 
        className={styles.headerLogo} 
        src="https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo-1536x864.png" 
        alt="Tinder logo" 
      />
      <IconButton>
        <Forum className={styles.headerIcon} />
      </IconButton>

    </div>
  );
}

export default Header;