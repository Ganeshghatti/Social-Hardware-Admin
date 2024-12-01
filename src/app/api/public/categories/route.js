import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/category";

// GET all categories
export async function GET(request) {
  try {
    await dbConnect();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}