"use client";

import { useState, useEffect } from "react";
import ProductForm from "./addForm";

const AddProductPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/category");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewProduct = () => {
    setShowForm(true);
  };

  const handleSubmit = async (formData: any) => {
    if (!formData.category || !formData.category.id) {
      alert("Invalid category selected.");
      return;
    }

    const requestBody = {
      ...formData,
      category_id: formData.category.id,
    };

    const response = await fetch("http://localhost:3001/items/featuredItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Product added successfully!");
      setShowForm(false); 
    } else {
      console.error("Failed to submit form");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Add New Product</h1>
      <button
        onClick={handleAddNewProduct}
        className="mb-4 px-4 py-2 bg-green-900 text-white rounded-lg"
      >
        + Add New Product
      </button>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <>
          {showForm && (
            <ProductForm
              initialData={{
                title: "",
                price: "",
                description: "",
                image: "",
                rating: 0,
                category: "",
              }}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
              categories={categories}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AddProductPage;
