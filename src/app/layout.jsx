import { AuthProvider } from './providers';
import './globals.css';

export const metadata = {
  title: 'Blog Admin',
  description: 'Blog Admin Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
