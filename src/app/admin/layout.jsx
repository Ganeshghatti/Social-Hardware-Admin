import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AuthCheck from '@/components/admin-dashboard/AuthCheck';
import "../globals.css"

export default function AdminLayout({ children }) {
  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <main className="p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthCheck>
  );
}
