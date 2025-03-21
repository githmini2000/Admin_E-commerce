"use client";

interface ProductCardProps {
  product: any;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition duration-300">
      <div className="w-full h-56 overflow-hidden rounded-md">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
      </div>

      <div className="mt-4 w-full flex justify-between border-b border-gray-300 pb-2">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        LKR {Number.isFinite(Number(product.price)) ? Number(product.price).toFixed(2) : "0.00"}
      </div>

      <p className="text-gray-600 mt-2 text-left">{product.description}</p>

      <div className="flex justify-start mt-2">
        {[...Array(product.rating)].map((_, i) => (
          <span key={`${product.id}-star-${i}`} className="text-green-800 text-lg">★</span>
        ))}
      </div>

      <div className="flex mt-4 space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="mt-4 bg-white border-4 border-green-900 text-green-900 font-bold px-4 py-1 rounded-sm hover:bg-green-500 hover:text-green transition self-start"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="mt-4 bg-white border-4 border-red-900 text-red-900 font-bold px-4 py-1 rounded-sm hover:bg-red-500 hover:text-red transition self-start"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
