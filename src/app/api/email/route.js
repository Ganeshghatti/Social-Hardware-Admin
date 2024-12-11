import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import EmailContent from "@/models/Email";
import { uploadImg } from "@/lib/uploadImg";
import mongoose from "mongoose";
import { generateUniqueSlug } from "@/lib/generateUniqueSlug";

// GET all email contents
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const emailContents = await EmailContent.find()
      .select("title content image status createdAt updatedAt")
      .sort({ createdAt: -1 });

    if (!emailContents) {
      return NextResponse.json(
        { error: "Email contents not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(emailContents);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST new email content
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const image = formData.get("image");
    const status = formData.get("status") || "draft";
    const blogId = formData.get("blog");

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    let imageUrl = null;
    if (image && image.size > 0) {
      const slug = await generateUniqueSlug(title);
      imageUrl = await uploadImg(image, slug);
    }

  

    const emailContent = await EmailContent.create({
      title,
      content,
      image: imageUrl,
      status,
      blog: blogId ? new mongoose.Types.ObjectId(blogId) : null,
    });

    return NextResponse.json(emailContent);
  } catch (error) {
    console.error("Error creating email content:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create email content" },
      { status: 500 }
    );
  }
}
