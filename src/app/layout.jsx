import { AuthProvider } from './providers';
import './globals.css';
import './index.scss';
import './App.scss';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Blog Admin',
  description: 'Blog Admin Dashboard',
  icons: {
    icon: [
      {
        url: '/assets/images/favicon.ico',
        sizes: '32x32',
      },
      {
        url: '/assets/images/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/assets/images/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/assets/images/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
