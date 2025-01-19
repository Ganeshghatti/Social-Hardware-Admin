import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import LeadCollection from "@/models/LeadCollection";
import Leads from "@/models/Leads";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const { searchIndustry, searchLocation } = await request.json();

    if (!searchIndustry || !searchLocation) {
      return NextResponse.json(
        {
          error: "Invalid data. 'searchIndustry' and 'searchLocation' are required.",
        },
        { status: 400 }
      );
    }

    const newLeadCollection = await LeadCollection.create({
      searchIndustry,
      searchLocation,
    });

    return NextResponse.json(newLeadCollection, { status: 201 });
  } catch (error) {
    console.error("Error creating lead collection:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create lead collection" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const leadCollections = await LeadCollection.find({})
      .sort({ createdAt: -1 });
    
    return NextResponse.json(leadCollections, { status: 200 });
  } catch (error) {
    console.error("Error fetching lead collections:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch lead collections" },
      { status: 500 }
    );
  }
}
