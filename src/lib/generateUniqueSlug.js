import Blog from "@/models/Blog";

// Helper function to generate and ensure unique slug
export async function generateUniqueSlug(title) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  let slug = baseSlug;

  // Add a unique number at the end of the slug
  const uniqueNumber = Date.now(); // Using current timestamp as a unique number
  slug = `${slug}-${uniqueNumber}`;

  // Ensure the slug is unique in the database
  while (await Blog.findOne({ slug })) {
    slug = `${slug}-${Math.floor(Math.random() * 10000)}`; // Append a random number if slug already exists
  }

  return slug;
}