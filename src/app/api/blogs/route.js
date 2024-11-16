import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
    
    console.log('Title from formData:', formData.get('title'));

    const coverImage = formData.get('coverImage');
    if (!coverImage) {
      throw new Error('Cover image is required');
    }

    const coverImagePath = await uploadFile(coverImage, formData.get('title'));

    const blog = await Blog.create({
      title: formData.get('title'),
      description: formData.get('description'),
      content: formData.get('content'),
      coverImage: coverImagePath,
    });

    return NextResponse.json(blog);

  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
} 