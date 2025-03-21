"use client";

import { useState } from "react";

interface CategoryItemProps {
  category: any;
  onEdit: (category: any) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:3001/category/${category.id}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          alert("Category deleted successfully!");
        } else {
          alert("Failed to delete category.");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <span>{category.name}</span>
      <div>
        <button
          onClick={() => onEdit(category)}
          className="px-4 py-1 bg-blue-500 text-white rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
