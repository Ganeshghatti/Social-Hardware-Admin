import React, { useState } from "react";
import Modal from "./ui/Modal";

const CategoryTable = ({ data, fetchCategories }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeDeleteId, setActiveDeleteId] = useState(null);
  const [activeUpdateId, setActiveUpdateId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateValue, setUpdateValue] = useState("");

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setIsDeleting(false);
      setActiveDeleteId(null);

      await fetchCategories();
    } catch (error) {
      alert("Error deleting category");
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault(); 
    if (updateValue.trim() === "") {
      return alert("Category name cannot be empty");
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updateValue.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      setIsUpdating(false);
      setActiveUpdateId(null);
      setUpdateValue("");
      await fetchCategories(); 
    } catch (error) {
      alert("Error updating category");
      setIsUpdating(false);
    }
  };

  const openUpdateModal = (id, currentName) => {
    setUpdateValue(currentName); 
    setActiveUpdateId(id);
  };

  const closeUpdateModal = () => {
    setActiveUpdateId(null);
    setUpdateValue("");
  };

  const openDeleteModal = (id) => {
    setActiveDeleteId(id);
  };

  const closeDeleteModal = () => {
    setActiveDeleteId(null);
  };

  return (
    <div
      className="rounded-lg shadow overflow-x-auto mt-4"
      style={{ backgroundColor: "var(--background-primary)" }}
    >
      <table className="min-w-full">
        <thead>
          <tr style={{ backgroundColor: "var(--background-secondary)" }}>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">
              Name
            </th>
            <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase">
              Created
            </th>
            <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium uppercase">
              Last Update
            </th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((category) => (
            <tr
              key={category._id}
              className="border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <td className="px-4 md:px-6 py-4">
                <div className="max-w-xs truncate">{category.name}</div>
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>
              <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                {new Date(category.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-4 md:px-6 py-4">
                <div className="flex gap-6">
                  <button
                    onClick={() => openUpdateModal(category._id, category.name)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  {activeUpdateId === category._id && (
                    <Modal
                      open={true}
                      onOpenChange={closeUpdateModal}
                      title="Update Category"
                    >
                      <form
                        onSubmit={(e) => handleUpdate(e, category._id)}
                        className="flex max-w-md flex-col gap-3 w-full px-3 py-6 pt-0 mt-6"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter category name"
                            value={updateValue}
                            onChange={(e) => setUpdateValue(e.target.value)}
                            className="w-full rounded p-2 text-sm md:text-base"
                            style={{
                              backgroundColor: "var(--background-primary)",
                              border: "1px solid var(--border-color)",
                            }}
                            required
                            disabled={isUpdating}
                          />
                        </div>

                        <div className="w-full flex justify-end mt-8">
                          <button
                            type="submit"
                            className={`bg-orange-500 p-1.5 rounded-lg w-fit hover:opacity-80 ${
                              isUpdating ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Updating..." : "Update Category"}
                          </button>
                        </div>
                      </form>
                    </Modal>
                  )}
                  <button
                    onClick={() => openDeleteModal(category._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  {activeDeleteId === category._id && (
                    <Modal
                      open={true}
                      onOpenChange={closeDeleteModal}
                      title="Remove Category"
                    >
                      <div className="flex max-w-md flex-col gap-3 w-full px-3 py-6 pt-0 mt-6">
                        <p>Are you sure you want to Delete this category?</p>

                        <div className="w-full flex justify-end mt-8">
                          <button
                            onClick={() => handleDelete(category._id)}
                            className={`bg-orange-500 p-1.5 rounded-lg w-fit hover:opacity-80 ${
                              isDeleting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isDeleting}
                          >
                            {isDeleting ? "Deleting..." : "Delete Category"}
                          </button>
                        </div>
                      </div>
                    </Modal>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
