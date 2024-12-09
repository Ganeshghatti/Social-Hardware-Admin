"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loader from "../Loader";
import toast from "react-hot-toast";

export default function EmailForm({ id = null }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    status: "draft",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState({
    draft: false,
    public: false,
    fetch: false,
  });
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

      setFormData((prev) => ({ ...prev, [type]: file }));
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (status) => {
    setError("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return;
    }

    setLoading((prev) => ({ ...prev, [status]: true }));

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("status", status);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      let api = id ? `/api/email/${id}` : "/api/email";

      let method = id ? "PUT" : "POST";

      const response = await fetch(api, {
        method: method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create email");
      }

      toast.success("Email Sent successfully");
      router.push("/admin/dashboard/email");
    } catch (error) {
      console.error("Error creating email:", error);
      setError(error.message);
      toast.error(error.message || "Failed to send email");
    } finally {
      setLoading((prev) => ({ ...prev, [status]: false }));
    }
  };

  const fetchEmail = async () => {
    if(!id) return;
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError("");

    try {
      const response = await fetch(`/api/email/${id}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create email");
      }
      
      setFormData({
        title: data.title,
        content: data.content,
        image: data.image,
        status: data.status,
      });

      setImagePreview(data.image);
    } catch (error) {
      console.error("Error fetching email:", error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmail();
    }
  }, [id]);

  return (
    <>
      {(id && loading.fetch) && <Loader />}
      <div className="mx-auto md:w-[85%] md:ml-[15%]">
        <div
          className="bg-white rounded-lg shadow-lg p-4 md:p-6"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">
              {id ? "Update" : "New"} Email
            </h1>
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

          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => {
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
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => {
                  setFormData({ ...formData, content: e.target.value });
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
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "image")}
                className="w-full text-sm md:text-base"
                required
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Cover Preview"
                    width={200}
                    height={200}
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>

            {/* <div>
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
                <option value="draft">Draft</option>
                <option value="public">Public</option>
              </select>
            </div> */}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => handleSubmit("draft")}
                disabled={loading.draft || loading.public}
                className="w-full sm:w-auto px-4 py-2 rounded text-sm md:text-base order-2 sm:order-1 disabled:opacity-50"
                style={{ border: "1px solid var(--border-color)" }}
              >
                {loading.draft ? "Saving..." : "Save as Draft"}
              </button>
              <button
                onClick={() => handleSubmit("public")}
                disabled={loading.draft || loading.public}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 text-sm md:text-base order-1 sm:order-2"
              >
                {loading.public ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
