'use client';

import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Added username state
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const signUpResult = await signUp.create({
        emailAddress: email,
        password,
        username, // Send username in the sign-up request
      });

      // After successful sign-up, trigger email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign up failed');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        // Redirect to main page after successful verification and sign-in
        router.push('/'); // This should take you to the home page
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Verification failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0f0f0f',
        color: '#fff',
      }}
    >
      <form
        onSubmit={pendingVerification ? handleVerify : handleSubmit}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: 30,
          background: '#1e1e1e',
          borderRadius: 12,
          boxShadow: '0 0 10px rgba(255,255,255,0.1)',
        }}
      >
        <h1 style={{ fontSize: '28px', marginBottom: '1rem' }}>Sign Up</h1>

        {!pendingVerification ? (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Handle username input
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: '1px solid #444',
                background: '#2a2a2a',
                color: 'white',
              }}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: '1px solid #444',
                background: '#2a2a2a',
                color: 'white',
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: '1px solid #444',
                background: '#2a2a2a',
                color: 'white',
              }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#7c3aed',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: '1px solid #444',
                background: '#2a2a2a',
                color: 'white',
              }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#22c55e',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Verify Email
            </button>
          </>
        )}

        {error && (
          <p style={{ marginTop: '1rem', color: '#f87171' }}>{error}</p>
        )}
      </form>
    </div>
  );
}
