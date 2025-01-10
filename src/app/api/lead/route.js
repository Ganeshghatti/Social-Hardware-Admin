import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Leads from "@/models/Leads";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const { searchLeads, searchedCategory, leads } = await request.json();

    if (!searchLeads || !searchedCategory || !Array.isArray(leads)) {
      return NextResponse.json(
        {
          error:
            "Invalid data. 'searchLeads', 'searchedCategory', and 'leads' are required.",
        },
        { status: 400 }
      );
    }

    const newLead = await Leads.create({
      searchLeads,
      searchedCategory,
      leads,
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Error saving leads:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save leads" },
      { status: 500 }
    );
  }
}
