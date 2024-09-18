import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata: Metadata = {
  title: 'Guilherme Cassettari',
  description: 'Portofolio Guilherme Cassettari',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex flex-column items-center justify-center  min-w-screen min-h-screen	relative`}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
