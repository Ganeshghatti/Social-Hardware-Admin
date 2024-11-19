import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadFile } from '@/lib/uploadFile';
import fs from 'fs/promises';
import path from 'path';

async function deleteImages(blog) {
  try {
    if (blog.coverImage) {
      const coverPath = path.join(process.cwd(), 'public', blog.coverImage.replace(/^\//, ''));
      await fs.unlink(coverPath);
    }
    if (blog.thumbnailImage) {
      const thumbnailPath = path.join(process.cwd(), 'public', blog.thumbnailImage.replace(/^\//, ''));
      await fs.unlink(thumbnailPath);
    }

    // Delete the parent folder if it exists
    if (blog.coverImage) {
      const folderPath = path.join(
        process.cwd(),
        'public',
        path.dirname(blog.coverImage.replace(/^\//, ''))
      );
      await fs.rm(folderPath, { recursive: true, force: true });
    }
  } catch (error) {
    console.error('Error deleting images:', error);
  }
}

// GET single blog
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id);
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    console.log(blog)
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
    if (!session || session.user.role !== 'admin') {
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

    const newCoverImage = formData.get('coverImage');
    const newThumbnailImage = formData.get('thumbnailImage');

    if (newCoverImage || newThumbnailImage) {
      // Delete old images first
      await deleteImages(blog);

      // Upload new images
      const imagePaths = await uploadFile(
        {
          coverImage: newCoverImage || null,
          thumbnailImage: newThumbnailImage || null,
        },
        updates.title
      );

      if (imagePaths.coverImage) updates.coverImage = imagePaths.coverImage;
      if (imagePaths.thumbnailImage) updates.thumbnailImage = imagePaths.thumbnailImage;
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
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete images first
    await deleteImages(blog);

    // Then delete the blog
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