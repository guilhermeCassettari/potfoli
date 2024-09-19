import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata: Metadata = {
  title: 'Guilherme Cassettari',
  description: 'Portofolio Guilherme Cassettari',
};

const spaceFont = Space_Grotesk({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceFont.className} antialiased   min-w-screen min-h-screen	relative`}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
