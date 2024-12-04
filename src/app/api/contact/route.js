import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
} 

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    const newContact = await Contact.create(data);

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
