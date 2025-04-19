'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign in failed');
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
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: 30,
          background: '#1e1e1e',
          borderRadius: 12,
          boxShadow: '0 0 10px rgba(255,255,255,0.1)',
        }}
      >
        <h1 style={{ fontSize: '28px', marginBottom: '1rem' }}>Sign In</h1>

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
          Sign In
        </button>

        {error && (
          <p style={{ marginTop: '1rem', color: '#f87171' }}>{error}</p>
        )}
      </form>
    </div>
  );
}
