// src/app/layout.tsx or similar
import { Inter } from 'next/font/google';
import './globals.css';

// You'll need to add these fonts to your project
// Either through next/font/google or by adding them to the head
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&display=swap" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}