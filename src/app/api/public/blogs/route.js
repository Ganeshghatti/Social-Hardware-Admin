import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET all blogs (public)
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
