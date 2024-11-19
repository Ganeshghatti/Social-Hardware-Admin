import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadFile } from '@/lib/uploadFile';

// GET all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const formData = await request.formData();

    // Get all form fields
    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');
    const coverImage = formData.get('coverImage');
    const thumbnailImage = formData.get('thumbnailImage');

    // Validate required fields
    if (!title || !description || !content || !coverImage || !thumbnailImage) {
      throw new Error('All fields including both images are required');
    }

    // Upload images
    const imagePaths = await uploadFile(
      { coverImage, thumbnailImage },
      title
    );
    console.log("imagePaths",imagePaths)
    // Create blog post
    console.log("thumbnailImage",imagePaths.thumbnailImage)
    const blog = await Blog.create({
      title,
      description,
      content,
      coverImage: imagePaths.coverImage,
      thumbnailImage: imagePaths.thumbnailImage,
    });
    console.log("blog",blog)
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
} 