"use client";

import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface EditProductFormProps {
  product: any;
  onUpdate: (formData: any) => void; // Changed from onSubmit to onUpdate
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onUpdate,
  onCancel,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    id: product.id, // Make sure to include the id in the form data
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category?.id || "", // Store only category ID
    rating: product.rating || 0,
  });

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/category");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      alert("Please select a valid category.");
      return;
    }
    if (!formData.id) {
      alert("Invalid product ID.");
      return;
    }
    onUpdate(formData); // Call onUpdate instead of onSubmit
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          
          {/* Rating */}
          <div className="mb-4">
            <label className="block font-semibold">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
          
          {/* Category Selection */}
          <div className="mb-4">
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="">Select Category</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Update
            </button>
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
