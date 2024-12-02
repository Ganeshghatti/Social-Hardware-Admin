import { NextResponse } from 'next/server';
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