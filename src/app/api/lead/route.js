import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Leads from "@/models/Leads";
import LeadCollection from "@/models/LeadCollection";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const { leadCollectionId, leads } = await request.json();

    if (!leadCollectionId || !Array.isArray(leads)) {
      return NextResponse.json(
        {
          error: "Invalid data. 'leadCollectionId' and 'leads' array are required.",
        },
        { status: 400 }
      );
    }

    // Verify leadCollection exists
    const leadCollection = await LeadCollection.findById(leadCollectionId);
    if (!leadCollection) {
      return NextResponse.json(
        { error: "LeadCollection not found" },
        { status: 404 }
      );
    }

    // Add leadCollection reference to each lead
    const leadsWithCollection = leads.map(lead => ({
      ...lead,
      leadCollection: leadCollectionId
    }));

    // Create all leads in a single operation
    const createdLeads = await Leads.create(leadsWithCollection);

    return NextResponse.json(createdLeads, { status: 201 });
  } catch (error) {
    console.error("Error saving leads:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save leads" },
      { status: 500 }
    );
  }
}

