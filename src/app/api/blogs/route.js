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
    const blogs = await Blog.find({})
      .select('title description thumbnailImage createdAt updatedAt')
      .sort({ createdAt: -1 });
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
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');
    const coverImage = formData.get('coverImage');
    const thumbnailImage = formData.get('thumbnailImage');

    if (!title || !content || !coverImage || !thumbnailImage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload images
    console.log('Uploading images...');
    const uploadedImages = await uploadFile(
      { coverImage, thumbnailImage },
      title
    );
    console.log('Images uploaded:', uploadedImages);

    await dbConnect();

    const blog = await Blog.create({
      title,
      description,
      content,
      coverImage: uploadedImages.coverImage,
      thumbnailImage: uploadedImages.thumbnailImage,
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
} 