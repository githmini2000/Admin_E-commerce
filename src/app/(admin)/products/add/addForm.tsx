"use client";

import { useState } from "react";

interface ProductFormProps {
  initialData: any;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  categories: any[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  categories,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (cat) => cat.name === formData.category
    );
    const updatedFormData = {
      ...formData,
      category_id: selectedCategory ? selectedCategory.id : null,
    };
    onSubmit(updatedFormData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            required
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            min="0"
            max="5"
            required
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="category"
            value={formData.category || ""}
            onChange={(e) => {
              const selectedCategory = categories.find(
                (cat) => cat.id === Number(e.target.value)
              );
              setFormData({ ...formData, category: selectedCategory || null });
            }}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button className="w-full py-2 bg-green-900 text-white rounded hover:bg-green-700">
            Add Product
          </button>
        </form>
        <button onClick={onCancel} className="mt-2 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
