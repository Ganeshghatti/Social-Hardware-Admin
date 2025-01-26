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
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the incoming JSON data
    const data = await request.json();

    // Log the received data
    console.log("Webhook data received:", data);

    for (const item of data.batch) {
      await Leads.updateOne(
        { _id: item._id }, // Match by ID
        { $set: { email: item.emails } } // Update the `emails` field
      );
    }

    console.log("updated email")

    return NextResponse.json(
      { message: "Email updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);

    // Return error response
    return NextResponse.json(
      { message: "Error processing webhook", error: error.message },
      { status: 500 }
    );
  }
}