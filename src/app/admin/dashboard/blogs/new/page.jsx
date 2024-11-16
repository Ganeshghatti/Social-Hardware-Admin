'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Loader from '@/components/Loader';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function NewBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    coverImage: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Only validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Only images are allowed');
        e.target.value = '';
        return;
      }

      setFormData({ ...formData, coverImage: file });
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Log the title being sent
      console.log('Sending title:', formData.title);
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage);
      }

      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create blog');
      }

      router.push('/admin/dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="max-w-4xl mx-auto rounded-lg shadow p-6" 
           style={{ backgroundColor: 'var(--background-primary)' }}>
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
        
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
              onChange={(e) => {
                console.log('Title changed:', e.target.value);
                setFormData({...formData, title: e.target.value});
              }}
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
              value={formData.description}
              onChange={(e) => {
                console.log('Description changed:', e.target.value);
                setFormData({...formData, description: e.target.value});
              }}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <ReactQuill
              value={formData.content}
              onChange={(content) => {
                console.log('Content changed:', content);
                setFormData({...formData, content});
              }}
              className="h-64 mb-12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
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
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
