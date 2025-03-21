"use client";

import CategoryItem from "./categoryItem";

interface CategoryListProps {
  categories: any[];
  onEdit: (category: any) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit }) => {
  return (
    <div className="space-y-4">
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={onEdit}
          />
        ))
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;
