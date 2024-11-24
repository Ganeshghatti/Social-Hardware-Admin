"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Loader from "@/components/Loader";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import MultiSelect from "@/components/ui/MultiSelect";

export default function EditBlog({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: null,
    thumbnailImage: null,
    category: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      alert("Error fetching categories");
    }
  };

  useEffect(() => {
    (
      async () => {
        await fetchBlog();
        await fetchCategories();
      }
    )()
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const data = await response.json();
      setFormData(data);
      console.log(data);
      setCoverPreview(data.coverImage);
      setThumbnailPreview(data.thumbnailImage);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);

      const categoryIds = formData.category.map((category) => category._id);
      formDataToSend.append("category", JSON.stringify(categoryIds));

      if (formData.coverImage instanceof File) {
        formDataToSend.append("coverImage", formData.coverImage);
      }
      if (formData.thumbnailImage instanceof File) {
        formDataToSend.append("thumbnailImage", formData.thumbnailImage);
      }

      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only images are allowed");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, [type]: file }));
      if (type === "coverImage") {
        setCoverPreview(URL.createObjectURL(file));
      } else {
        setThumbnailPreview(URL.createObjectURL(file));
      }
      setError("");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="md:w-[85%] md:ml-[15%]">
        <div
          className="bg-white rounded-lg shadow-lg p-4 md:p-6"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">Edit Blog</h1>
            <button
              onClick={() => router.back()}
              className="text-sm hover:underline w-full sm:w-auto text-center"
            >
              ← Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded p-2 text-sm md:text-base"
                style={{
                  backgroundColor: "var(--background-primary)",
                  border: "1px solid var(--border-color)",
                }}
                required
              />
            </div>
            <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <MultiSelect
              options={categories || []}
              defaultValue={formData.category || []}
              onChange={(selectedOptions) => {
                setFormData({
                  ...formData,
                  category:  selectedOptions,
                })
              }}
            />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded p-2 text-sm md:text-base"
                style={{
                  backgroundColor: "var(--background-primary)",
                  border: "1px solid var(--border-color)",
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <div className="h-[300px] md:h-[400px] mb-12">
                <ReactQuill
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({ ...prev, content }))
                  }
                  className="h-full"
                  theme="snow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "coverImage")}
                className="w-full text-sm md:text-base"
              />
              <p className="mt-1 text-xs md:text-sm opacity-70">
                Supported formats: JPG, PNG, GIF, WebP
              </p>
              {coverPreview && (
                <div className="mt-2">
                  <Image
                    src={coverPreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "thumbnailImage")}
                className="w-full text-sm md:text-base"
              />
              <p className="mt-1 text-xs md:text-sm opacity-70">
                Supported formats: JPG, PNG, GIF, WebP
              </p>
              {thumbnailPreview && (
                <div className="mt-2">
                  <Image
                    src={thumbnailPreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto px-4 py-2 rounded text-sm md:text-base order-2 sm:order-1"
                style={{ border: "1px solid var(--border-color)" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm md:text-base order-1 sm:order-2"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
