import './globals.css';
import { type Metadata } from 'next'
import {
  ClerkProvider,
  ClerkLoaded,
  ClerkLoading
} from '@clerk/nextjs'
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'assignment',
  description: 'Next.js app with animated canvas gradients',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
