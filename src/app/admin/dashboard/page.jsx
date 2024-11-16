'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        throw new Error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  return (
    <>
      {loading && <Loader />}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <Link 
            href="/admin/dashboard/blogs/new"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Create New Blog
          </Link>
        </div>

        <div className="rounded-lg shadow overflow-hidden" 
             style={{ backgroundColor: 'var(--background-primary)' }}>
          <table className="min-w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--background-secondary)' }}>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Cover</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{truncateText(blog.title, 50)}</td>
                  <td className="px-6 py-4 max-w-md">{truncateText(blog.description, 100)}</td>
                  <td className="px-6 py-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <Link 
                      href={`/admin/dashboard/blogs/${blog._id}`}
                      className="hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
