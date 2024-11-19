'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

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

  const handleEdit = (id) => {
    router.push(`/admin/dashboard/blogs/${id}`);
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
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">Thumbnail</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">Title</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase">Description</th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase">Created</th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase">Last Update</th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr 
                  key={blog._id}
                  className="border-t"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <td className="px-4 md:px-6 py-4">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={blog.thumbnailImage}
                        alt={blog.title}
                        fill
                        className="object-cover rounded"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="max-w-xs truncate">{blog.title}</div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4">
                    <div className="max-w-xs truncate">{blog.description}</div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    {new Date(blog.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex gap-6">
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
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
