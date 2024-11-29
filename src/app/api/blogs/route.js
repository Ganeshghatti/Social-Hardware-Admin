import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadFile } from "@/lib/uploadFile";
import { generateUniqueSlug } from "@/lib/generateUniqueSlug";
import { uploadImg } from "@/lib/uploadImg";

// GET all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find()
      .populate("category")
      .select(
        "title description thumbnailImage createdAt updatedAt category status"
      )
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const coverImage = formData.get("coverImage");
    const thumbnailImage = formData.get("thumbnailImage");
    const category = JSON.parse(formData.get("category"));
    const status = formData.get("status") || "private";

    if (
      !title ||
      !description ||
      !coverImage ||
      !thumbnailImage ||
      !Array.isArray(category) ||
      category.length === 0
    ) {
      throw new Error("All fields including both images are required");
    }

    // Generate and ensure unique slug
    const slug = await generateUniqueSlug(title);

    // Upload images
    const coverImageUrl = await uploadImg(coverImage, slug);
    const thumbnailImageUrl = await uploadImg(thumbnailImage, slug);

    // Create blog post
    const blog = await Blog.create({
      title,
      slug,
      description,
      content: "",
      coverImage: coverImageUrl,
      thumbnailImage: thumbnailImageUrl,
      category,
      status,
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}
