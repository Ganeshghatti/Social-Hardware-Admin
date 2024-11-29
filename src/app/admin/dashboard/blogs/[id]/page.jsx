"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Loader from "@/components/Loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MultiSelect from "@/components/ui/MultiSelect";
import { extractImageUrls } from "@/lib/extractImageUrls";

export default function EditBlog({ params }) {
  const router = useRouter();
  const quillRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: null,
    thumbnailImage: null,
    category: [],
    status: "private",
  });
  const [initialImages, setInitialImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const formDatatoSend = new FormData();
          formDatatoSend.append("image", file);
          formDatatoSend.append("slug", formData.slug);
          console.log(formDatatoSend);
          const response = await fetch("/api/blogs/upload-inline-image", {
            method: "POST",
            body: formDatatoSend,
          });

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const data = await response.json();
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", data.url);
          editor.setSelection(range.index + 1);
          editor.insertText(range.index + 1, "\n");
        } catch (error) {
          console.error("Error uploading image:", error);
          setError("Failed to upload image");
        }
      }
    };
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
      const initialImages = extractImageUrls(data.content);
      setInitialImages(initialImages);
    } catch (error) {
      alert("Error fetching categories");
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBlog();
      await fetchCategories();
    })();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      const data = await response.json();
      setFormData(data);
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
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", JSON.stringify(formData.category));
      formDataToSend.append("status", formData.status);

      if (formData.coverImage instanceof File) {
        formDataToSend.append("coverImage", formData.coverImage);
        formDataToSend.append("coverImageChanged", "true");
      }

      if (formData.thumbnailImage instanceof File) {
        formDataToSend.append("thumbnailImage", formData.thumbnailImage);
        formDataToSend.append("thumbnailImageChanged", "true");
      }
      const currentImages = extractImageUrls(formData.content);
      const imagesToDelete = initialImages.filter(
        (url) => !currentImages.includes(url)
      );
      if (imagesToDelete.length > 0) {
        formDataToSend.append("imagesToDelete", JSON.stringify(imagesToDelete));
      }
      console.log(formDataToSend);
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      console.log(response);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update blog");
      }
    } catch (error) {
      console.log(error)
      setError(error.message);
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

      const previewUrl = URL.createObjectURL(file);
      if (type === "coverImage") {
        setCoverPreview(previewUrl);
      } else if (type === "thumbnailImage") {
        setThumbnailPreview(previewUrl);
      }

      setError("");
    }
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
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
                    category: selectedOptions,
                  });
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
                  onChange={(content) => {
                    console.log("Content changed:", content);
                    setFormData({ ...formData, content });
                  }}
                  className="h-64 mb-12"
                  theme="snow"
                  ref={quillRef}
                  modules={modules}
                  formats={formats}
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
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full rounded p-2 text-sm md:text-base"
                style={{
                  backgroundColor: "var(--background-primary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
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
