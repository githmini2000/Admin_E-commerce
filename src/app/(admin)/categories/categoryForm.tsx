"use client";

import { useState, useEffect } from "react";

interface CategoryFormProps {
  initialData: any;
  onCancel: () => void;
  onSuccess: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onCancel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<any>(initialData || { name: "" });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `http://localhost:3001/category/${formData.id}`
      : "http://localhost:3001/category";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Category saved successfully!");
        onSuccess();
      } else {
        alert("Failed to save category.");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {initialData ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
