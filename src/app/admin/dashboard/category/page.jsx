"use client";
import React, { useState, useEffect } from "react";
import CategoryTable from "@/components/CategoryTable";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

const page = () => {
  const [categoryName, setCategoryName] = useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create category");
      }

      const newCategory = await response.json();
      setCategoryName("");
      setIsModalOpen(false)
      await fetchCategories();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      alert('Error fetching categories');
    }
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ name: UpdatedcategoryName.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      alert('Category updated successfully');
      fetchCategories();
    //   setCategoryName('');
    } catch (error) {
      alert('Error updating category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Modal
          openModal={isModalOpen}
          setOpenModal={setIsModalOpen}
          modalTitle="Add New Category"
          openBtn={
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center">
              Add Category
            </button>
          }
        >
          <form
            onSubmit={handleCreateCategory}
            className="flex max-w-md flex-col gap-3 w-full px-3 py-6 pt-0 mt-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full rounded p-2 text-sm md:text-base"
                style={{
                  backgroundColor: "var(--background-primary)",
                  border: "1px solid var(--border-color)",
                }}
                required
                disabled={isLoading}
              />
            </div>

            <div className="w-full flex justify-end mt-8">
              <button
                type="submit"
                className={`bg-orange-500 p-1.5 rounded-lg w-fit hover:opacity-80 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      {
        categories.length > 0 ? (
            <CategoryTable data={categories} fetchCategories={fetchCategories}/>
        ) : <p>No categories found</p>
      }
    </div>
  );
};

export default page;
