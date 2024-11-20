import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET all blogs (public)
export async function GET(request) {
  try {
    await dbConnect();
    const blogs = await Blog.find({})
      .select('title description thumbnailImage createdAt updatedAt')
      .sort({ createdAt: -1 });

    // Create response with CORS and cache control headers
    const response = NextResponse.json(blogs);
    
    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*'); // Or specify your frontend domain
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
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

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request) {
  const response = new NextResponse(null, { status: 200 });
  
  response.headers.set('Access-Control-Allow-Origin', '*'); // Or specify your frontend domain
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}
