import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadImg } from "@/lib/uploadImg";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image");
    const slug = formData.get("slug");
    console.log(image, slug);
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Upload image to the blog's inline-images folder
    const imageUrl = await uploadImg(image, `${slug}/inline-images`);
    console.log(imageUrl);
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
