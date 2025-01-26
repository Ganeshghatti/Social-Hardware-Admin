import dbConnect from "@/lib/mongodb";
import Leads from "@/models/Leads";
import { NextResponse } from "next/server";

// Helper function to handle CORS
function cors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*') // Be more specific in production
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

// Handle OPTIONS request (preflight)
export async function OPTIONS() {
  return cors(NextResponse.json({}, { status: 200 }))
}

export async function POST(request) {
  // Apply CORS headers to the response
  const response = await handlePost(request);
  return cors(response);
}

async function handlePost(request) {
  try {
    await dbConnect();
    const data = await request.json();
    console.log("Webhook data received:", data);

    for (const item of data.batch) {
      await Leads.updateOne(
        { _id: item._id },
        { $set: { email: item.emails } }
      );
    }

    console.log("updated email");
    return NextResponse.json(
      { message: "Email updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Error processing webhook", error: error.message },
      { status: 500 }
    );
  }
}