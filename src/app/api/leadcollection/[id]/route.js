import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Leads from "@/models/Leads";


export async function GET(request,{ params }) {
    const session = await getServerSession(authOptions);
  
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      await dbConnect();
  
      const leadCollectionId = await params.id;
  
      if (!leadCollectionId) {
        return NextResponse.json(
          { error: "leadCollectionId is required" },
          { status: 400 }
        );
      }
  
      const leads = await Leads.find({ leadCollection: leadCollectionId })
        .populate('leadCollection')
        .sort({ createdAt: -1 });
    
  
      return NextResponse.json(leads, { status: 200 });
    } catch (error) {
      console.error("Error fetching leads:", error);
      return NextResponse.json(
        { error: error.message || "Failed to fetch leads" },
        { status: 500 }
      );
    }
  }