import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadFile, deleteImages } from '@/lib/uploadFile';

// GET single blog
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const updates = {
      title: formData.get('title'),
      description: formData.get('description'),
      content: formData.get('content'),
      updatedAt: new Date(),
    };

    // Handle image updates
    const newCoverImage = formData.get('coverImage');
    const newThumbnailImage = formData.get('thumbnailImage');

    if (newCoverImage || newThumbnailImage) {
      const imagesToUpload = {};
      const imagesToDelete = {};

      if (newCoverImage) {
        imagesToUpload.coverImage = newCoverImage;
        imagesToDelete.coverImage = blog.coverImage;
      }

      if (newThumbnailImage) {
        imagesToUpload.thumbnailImage = newThumbnailImage;
        imagesToDelete.thumbnailImage = blog.thumbnailImage;
      }

      // Delete old images that are being replaced
      if (Object.keys(imagesToDelete).length > 0) {
        await deleteImages(imagesToDelete);
      }

      // Upload new images
      if (Object.keys(imagesToUpload).length > 0) {
        const imagePaths = await uploadFile(imagesToUpload, updates.title);
        if (imagePaths.coverImage) updates.coverImage = imagePaths.coverImage;
        if (imagePaths.thumbnailImage) updates.thumbnailImage = imagePaths.thumbnailImage;
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      updates,
      { new: true }
    );

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete images first
    await deleteImages(blog);

    // Delete the blog post
    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 