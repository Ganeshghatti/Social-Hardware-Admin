import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { deleteImg, deleteBlogFolder } from "@/lib/deleteImg";
import { uploadImg } from "@/lib/uploadImg";

// GET single blog
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id).populate("category");

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const newContent = formData.get("content");
    const oldContent = blog.content;

    // Get old and new inline image URLs from the content
    const oldInlineImages =
      oldContent
        .match(/src="([^"]+)"/g)
        ?.map((src) => src.replace('src="', "").replace('"', "")) || [];

    const newInlineImages =
      newContent
        .match(/src="([^"]+)"/g)
        ?.map((src) => src.replace('src="', "").replace('"', "")) || [];

    // Find images that were removed
    const removedImages = oldInlineImages.filter(
      (oldUrl) => !newInlineImages.includes(oldUrl) && oldUrl.includes("blogs/")
    );

    const updates = {
      title: formData.get("title"),
      description: formData.get("description"),
      content: newContent,
      category: JSON.parse(formData.get("category")),
      status: formData.get("status"),
      updatedAt: new Date(),
    };

    // Track images that need to be deleted
    const imagesToDelete = [...removedImages];

    // Handle cover image update
    const coverImageChanged = formData.get("coverImageChanged") === "true";
    if (coverImageChanged) {
      const newCoverImage = formData.get("coverImage");
      if (!newCoverImage) {
        throw new Error("Cover image is required");
      }
      if (blog.coverImage) {
        imagesToDelete.push(blog.coverImage);
      }
      updates.coverImage = await uploadImg(newCoverImage, blog.slug);
    }

    // Handle thumbnail image update
    const thumbnailImageChanged =
      formData.get("thumbnailImageChanged") === "true";
    if (thumbnailImageChanged) {
      const newThumbnailImage = formData.get("thumbnailImage");
      if (!newThumbnailImage) {
        throw new Error("Thumbnail image is required");
      }
      if (blog.thumbnailImage) {
        imagesToDelete.push(blog.thumbnailImage);
      }
      updates.thumbnailImage = await uploadImg(newThumbnailImage, blog.slug);
    }

    // Delete all removed images
    if (imagesToDelete.length > 0) {
      await Promise.all(imagesToDelete.map((imageUrl) => deleteImg(imageUrl)));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(params.id, updates, {
      new: true,
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete the blog's folder from Firebase Storage
    await deleteBlogFolder(blog.slug);

    // Delete the blog from database
    await Blog.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
