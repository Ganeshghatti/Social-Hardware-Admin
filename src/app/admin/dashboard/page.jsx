'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      // Refresh blogs list
      await fetchBlogs();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting blog:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="space-y-6 md:w-[85%] md:ml-[15%]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <Link 
            href="/admin/dashboard/blogs/new"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
          >
            Create New Blog
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="rounded-lg shadow overflow-x-auto" 
             style={{ backgroundColor: 'var(--background-primary)' }}>
          <table className="min-w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--background-secondary)' }}>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">Cover</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase">Description</th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase">Created At</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td className="px-4 md:px-6 py-4">
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="h-10 w-10 md:h-12 md:w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="max-w-[150px] md:max-w-none">
                        {truncateText(blog.title, 30)}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 max-w-md">
                      {truncateText(blog.description, 100)}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-4">
                        <Link 
                          href={`/admin/dashboard/blogs/${blog._id}`}
                          className="text-orange-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    {loading ? 'Loading...' : error ? 'Error loading blogs' : 'No blogs found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
