import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProviders } from './context-providers.js';
import { TopNavbar } from './top-navbar.js';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ContextProviders>
          <ToastContainer autoClose={5000} position='top-center' theme='light' />
          <div className='flex h-screen flex-col'>
            <TopNavbar />
            <div className='mx-auto w-full max-w-5xl flex-1 overflow-auto'>{children}</div>
          </div>
        </ContextProviders>
      </body>
    </html>
  );
}
