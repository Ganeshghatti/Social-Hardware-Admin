import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Subscribe from '@/models/Subscription';

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate email
    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const isExisting = await Subscribe.findOne({ email: data.email });

    if (isExisting) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Create a new subscription
    const newSubscription = await Subscribe.create(data);

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
} 

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const subscribers = await Subscribe.find().sort({ createdAt: -1 });

    if (!subscribers) {
      return NextResponse.json({ error: 'Subscribers not found' }, { status: 404 });
    }
    
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
