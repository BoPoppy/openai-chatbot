import { Inter } from 'next/font/google';

import Chat from '@/components/Chat';
import Providers from '@/components/Providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookbuddy',
  description: 'Your bookstore for fantasy & mystery novels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Chat />
          {children}
        </body>
      </Providers>
    </html>
  );
}
