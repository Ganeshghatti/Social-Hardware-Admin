import dbConnect from "@/lib/mongodb";
import Leads from "@/models/Leads";
import { NextResponse } from "next/server";

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
