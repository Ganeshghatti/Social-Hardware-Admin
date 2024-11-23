"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import Loader from "@/components/Loader";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import MultiSelect from "@/components/ui/MultiSelect";

export default function NewBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: null,
    thumbnailImage: null,
  });
  const [imagePreview, setImagePreview] = useState({
    coverImage: null,
    thumbnailImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only images are allowed");
        e.target.value = "";
        return;
      }

      setFormData(prev => ({ ...prev, [type]: file }));
      setImagePreview(prev => ({
        ...prev,
        [type]: URL.createObjectURL(file)
      }));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("content", formData.content);
      
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }
      if (formData.thumbnailImage) {
        formDataToSend.append("thumbnailImage", formData.thumbnailImage);
      }

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create blog");
      }

      router.push("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: "React JS", label: "React JS" },
    { value: "Angular", label: "Angular" },
    { value: "Vue JS", label: "Vue JS" },
    { value: "Svelte", label: "Svelte" },
    { value: "Next JS", label: "Next JS" },
    { value: "Gatsby", label: "Gatsby" },
    { value: "Nuxt JS", label: "Nuxt JS" },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="mx-auto md:w-[85%] md:ml-[15%]">
        <div
          className="bg-white rounded-lg shadow-lg p-4 md:p-6"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">Create New Blog</h1>
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
                onChange={(e) => {
                  console.log("Title changed:", e.target.value);
                  setFormData({ ...formData, title: e.target.value });
                }}
                className="w-full rounded p-2 text-sm md:text-base"
                style={{
                  backgroundColor: "var(--background-primary)",
                  border: "1px solid var(--border-color)",
                }}
                required
              />
            </div>
            <h2>Category</h2>
            <MultiSelect
        options={options}
        defaultValue={[
          { value: "Vue JS", label: "Vue JS" },
          { value: "Svelte", label: "Svelte" },
          { value: "Next JS", label: "Next JS" },
        ]}
        onChange={(selectedOptions) => console.log(selectedOptions)}
      />

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => {
                  console.log("Description changed:", e.target.value);
                  setFormData({ ...formData, description: e.target.value });
                }}
                style={{
                  backgroundColor: "var(--background-primary)",
                  border: "1px solid var(--border-color)",
                }}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <ReactQuill
                value={formData.content}
                onChange={(content) => {
                  console.log("Content changed:", content);
                  setFormData({ ...formData, content });
                }}
                className="h-64 mb-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'coverImage')}
                  className="w-full text-sm md:text-base"
                  required
                />
                {imagePreview.coverImage && (
                  <div className="mt-2">
                    <Image 
                      src={imagePreview.coverImage}
                      alt="Cover Preview"
                      width={200}
                      height={200}
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'thumbnailImage')}
                  className="w-full text-sm md:text-base"
                  required
                />
                {imagePreview.thumbnailImage && (
                  <div className="mt-2">
                    <Image 
                      src={imagePreview.thumbnailImage}
                      alt="Thumbnail Preview"
                      width={200}
                      height={200}
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
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
                disabled={loading}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm md:text-base order-1 sm:order-2"
              >
                {loading ? "Creating..." : "Create Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
