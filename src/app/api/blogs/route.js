import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadFile } from "@/lib/uploadFile";

// GET all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({})
      .populate("category")
      .select("title description thumbnailImage createdAt updatedAt category")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Helper function to generate slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper function to ensure unique slug
async function ensureUniqueSlug(baseSlug) {
  let slug = baseSlug;
  let counter = 1;

  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
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
    const content = formData.get("content");
    const coverImage = formData.get("coverImage");
    const thumbnailImage = formData.get("thumbnailImage");
    const category = JSON.parse(formData.get("category"));

    if (
      !title ||
      !description ||
      !content ||
      !coverImage ||
      !thumbnailImage ||
      category.length === 0
    ) {
      throw new Error("All fields including both images are required");
    }

    // Generate and ensure unique slug
    const baseSlug = generateSlug(title);
    const slug = await ensureUniqueSlug(baseSlug);

    // Upload images
    const imagePaths = await uploadFile({ coverImage, thumbnailImage }, title);

    // Create blog post with slug
    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      coverImage: imagePaths.coverImage,
      thumbnailImage: imagePaths.thumbnailImage,
      category,
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
