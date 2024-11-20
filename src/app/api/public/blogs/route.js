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

    // Create response with cache control headers
    const response = NextResponse.json(blogs);
    
    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}
