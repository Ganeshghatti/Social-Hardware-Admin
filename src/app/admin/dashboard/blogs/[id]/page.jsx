'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Loader from '@/components/Loader';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function EditBlog({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    coverImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const data = await response.json();
      setFormData(data);
      setImagePreview(data.coverImage);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      if (formData.coverImage instanceof File) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else {
        throw new Error('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="max-w-4xl mx-auto rounded-lg shadow p-6" 
           style={{ backgroundColor: 'var(--background-primary)' }}>
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full rounded p-2"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                border: '1px solid var(--border-color)',
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full rounded p-2"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                border: '1px solid var(--border-color)',
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <div style={{ 
              backgroundColor: 'var(--background-primary)',
              border: '1px solid var(--border-color)',
            }}>
              <ReactQuill
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                className="h-64 mb-12"
                theme="snow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              style={{ 
                backgroundColor: 'var(--background-primary)',
                border: '1px solid var(--border-color)',
              }}
            />
            <p className="mt-1 text-sm">
              Supported formats: JPG, PNG, GIF, WebP
            </p>
            {imagePreview && (
              <div className="mt-2">
                <Image 
                  src={imagePreview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded"
              style={{ border: '1px solid var(--border-color)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
