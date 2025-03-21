"use client";

import { useEffect, useState } from "react";
import CategoryList from "./categoryList";
import CategoryForm from "./categoryForm";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewCategory = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Manage Categories</h1>
      <button
        onClick={handleAddNewCategory}
        className="mb-4 px-4 py-2 bg-green-900 text-white rounded-lg"
      >
        + Add New Category
      </button>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <CategoryList
          categories={categories}
          onEdit={handleEditCategory}
        />
      )}
      {showForm && (
        <CategoryForm
          initialData={selectedCategory}
          onCancel={handleFormClose}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
