'use client';

import { UserButton, SignOutButton, useUser } from '@clerk/nextjs';
import styles from '../app/styles.module.css';
import Link from 'next/link';

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {!isSignedIn ? (
          <>
            <h1>Welcome to Dashboard</h1>
            <h2>Please click on sign-in or sign-up to proceed</h2>
            <div className={styles.authButtonsWrapper}>
              <Link href="/sign-in" passHref>
                <button className={styles.button}>Sign In</button>
              </Link>
              <Link href="/sign-up" passHref>
                <button className={styles.button}>Sign Up</button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1>You successfully signed in!</h1>
            <div className={styles.userActionWrapper}>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '60px',
                      height: '60px',
                    },
                  },
                }}
                afterSignOutUrl="/"
              />
              <SignOutButton>
                <button className={styles.signOutButton}>Sign Out</button>
              </SignOutButton>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
