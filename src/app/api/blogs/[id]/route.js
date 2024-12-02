import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";
import { deleteImg, deleteBlogFolder } from "@/lib/deleteImg";
import { uploadImg } from "@/lib/uploadImg";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

// Add this helper function at the top of the file
function normalizeUrl(url) {
  return url.replace(/&amp;/g, '&');
}

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

    // Extract and normalize image URLs from the new content
    const newInlineImages = (newContent.match(/src="([^"]+)"/g)?.map(src => 
      normalizeUrl(src.replace('src="', '').replace('"', ''))
    ) || []);

    // List all files in the blog's inline-images folder
    const folderRef = ref(storage, `blogs/${blog.slug}/inline-images`);
    const listResult = await listAll(folderRef);
    
    // Get full URLs of all files in the folder
    const existingUrls = await Promise.all(
      listResult.items.map(async (item) => {
        return await getDownloadURL(item);
      })
    );

    console.log('Images in folder:', existingUrls);
    console.log('Normalized images in content:', newInlineImages);

    // Find images that exist in folder but not in content
    const imagesToDelete = existingUrls.filter(url => 
      !newInlineImages.includes(normalizeUrl(url))
    );

    console.log('Images to delete:', imagesToDelete);

    // Delete unused images
    if (imagesToDelete.length > 0) {
      await Promise.all(imagesToDelete.map((imageUrl) => deleteImg(imageUrl)));
    }

    // Update blog with new data
    const updates = {
      title: formData.get("title"),
      description: formData.get("description"),
      content: newContent,
      category: JSON.parse(formData.get("category")),
      status: formData.get("status"),
      updatedAt: new Date(),
    };

    // Handle cover and thumbnail image updates as before
    const coverImageChanged = formData.get("coverImageChanged") === "true";
    if (coverImageChanged) {
      const newCoverImage = formData.get("coverImage");
      if (!newCoverImage) {
        throw new Error("Cover image is required");
      }
      if (blog.coverImage) {
        await deleteImg(blog.coverImage);
      }
      updates.coverImage = await uploadImg(newCoverImage, blog.slug);
    }

    const thumbnailImageChanged = formData.get("thumbnailImageChanged") === "true";
    if (thumbnailImageChanged) {
      const newThumbnailImage = formData.get("thumbnailImage");
      if (!newThumbnailImage) {
        throw new Error("Thumbnail image is required");
      }
      if (blog.thumbnailImage) {
        await deleteImg(blog.thumbnailImage);
      }
      updates.thumbnailImage = await uploadImg(newThumbnailImage, blog.slug);
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

    try {
      // Try to delete files from Firebase Storage
      await deleteBlogFolder(blog.slug);
    } catch (storageError) {
      console.error("Error deleting files from storage:", storageError);
      // Continue with blog deletion even if storage deletion fails
    }

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
