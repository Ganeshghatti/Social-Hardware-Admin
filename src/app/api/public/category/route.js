import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
<<<<<<< HEAD
import Category from '@/models/Categories';
=======
import Category from '@/models/category';
>>>>>>> 84f1dc9fdd0321cad045f6f1d96f4fa49eb7fde7

// GET all blogs (public)
export async function GET(request) {
  try {
    await dbConnect();
    const categories = await Category.find({})

    // Create response with CORS and cache control headers
    const response = NextResponse.json(categories);
    
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
