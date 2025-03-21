"use client";

import { useEffect, useState } from "react";
import ProductList from "./productList";
import EditProductForm from "./editForm";

const ViewProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      let allProducts: any[] = [];
      let page = 1;
      let hasMoreData = true;
      const pageSize = 10;

      while (hasMoreData) {
        const response = await fetch(
          `http://localhost:3001/items?section=featuredItems&page=${page}&size=${pageSize}`
        );
        if (!response.ok) throw new Error(`Failed to fetch page ${page}`);
        const data = await response.json();
        if (data.length === 0) hasMoreData = false;
        else {
          const formattedProducts = data.map((product: any) => ({
            ...product,
            category: product.category ? product.category : { id: "", name: "" },
          }));
          allProducts = [...allProducts, ...formattedProducts];
          page++;
        }
      }

      setProducts(allProducts);
    } catch (error) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product); // Set the product to edit
  };

  const handleUpdate = async (updatedProduct: any) => {
    if (!updatedProduct.id) {
      alert("Invalid product ID.");
      return;
    }

    // Send a request to update the product
    const response = await fetch(
      `http://localhost:3001/items/featuredItems/${updatedProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    );

    if (response.ok) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setEditingProduct(null); // Close the edit form
    } else {
      alert("Failed to update the product.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const response = await fetch(
      `http://localhost:3001/items/featuredItems/${id}`,
      { method: "DELETE" }
    );
    if (response.ok) fetchAllProducts();
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">View Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : editingProduct ? (
        <EditProductForm 
          product={editingProduct} 
          onUpdate={handleUpdate} // Pass onUpdate here
          onCancel={() => setEditingProduct(null)} 
        />
      ) : (
        <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ViewProductsPage;
