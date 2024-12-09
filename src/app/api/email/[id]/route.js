import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import EmailContent from "@/models/Email";
import { uploadImg } from "@/lib/uploadImg";

// GET single email content
export async function GET(request, { params }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  try {
    await dbConnect();

    const emailContent = await EmailContent.findById(params.id);

    if (!emailContent) {
      return NextResponse.json({ error: "Email content not found" }, { status: 404 });
    }
    return NextResponse.json(emailContent);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT update email content
export async function PUT(request, { params }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  try {

    await dbConnect();

    const emailContent = await EmailContent.findById(params.id);

    if (!emailContent) {
      return NextResponse.json({ error: "Email content not found" }, { status: 404 });
    }

    const formData = await request.formData();

    const updates = {
      title: formData.get("title") || emailContent.title,
      content: formData.get("content") || emailContent.content,
      status: formData.get("status") || emailContent.status,
      updatedAt: new Date(),
    };

    // Handle image update
    const image = formData.get("image");
    if (image && image.size > 0) {
      // Delete old image if exists
      if (emailContent.image) {
        // Implement image deletion logic if needed
      }
      
      // Upload new image
      updates.image = await uploadImg(image, `email-content-${params.id}`);
    }

    const updatedEmailContent = await EmailContent.findByIdAndUpdate(
      params.id, 
      updates, 
      { new: true }
    );

    return NextResponse.json(updatedEmailContent);
  } catch (error) {
    console.error("Error updating email content:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update email content" },
      { status: 500 }
    );
  }
}

// DELETE email
export async function DELETE(request, { params }) {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
  try {

    await dbConnect();
    const emailContent = await EmailContent.findById(params.id);
    if (!emailContent) {
      return NextResponse.json({ error: "Email content not found" }, { status: 404 });
    }

    // Delete associated image if exists
    if (emailContent.image) {
      // Implement image deletion logic if needed
    }

    // Delete the email content from database
    await EmailContent.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Email content deleted successfully" });
  } catch (error) {
    console.error("Error deleting email content:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete email content" },
      { status: 500 }
    );
  }
}