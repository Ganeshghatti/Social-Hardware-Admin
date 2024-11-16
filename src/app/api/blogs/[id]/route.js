import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadFile } from '@/lib/uploadFile';
import fs from 'fs/promises';
import path from 'path';

async function deleteImage(imagePath) {
  if (!imagePath) return;
  
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath.replace(/^\//, ''));
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting image:', error);
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
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const formData = await request.formData();
    const oldBlog = await Blog.findById(params.id);
    
    if (!oldBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const updateData = {
      title: formData.get('title'),
      description: formData.get('description'),
      content: formData.get('content'),
    };

    // Handle new cover image if provided
    const newCoverImage = formData.get('coverImage');
    if (newCoverImage && newCoverImage.size > 0) {
      // Delete old image first
      await deleteImage(oldBlog.coverImage);
      
      // Upload new image
      const coverImagePath = await uploadFile(newCoverImage, formData.get('title'));
      updateData.coverImage = coverImagePath;
    }

    const blog = await Blog.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
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

    // Delete cover image
    await deleteImage(blog.coverImage);

    // Delete blog
    await blog.deleteOne();
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
} 