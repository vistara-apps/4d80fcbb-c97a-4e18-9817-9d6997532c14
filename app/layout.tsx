import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'CreatorCoin Predict',
  description: 'Build instant prediction markets with your community\'s token',
  openGraph: {
    title: 'CreatorCoin Predict',
    description: 'Build instant prediction markets with your community\'s token',
    type: 'website',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
    'fc:frame:button:1': 'Create Market',
    'fc:frame:button:2': 'View Markets',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
