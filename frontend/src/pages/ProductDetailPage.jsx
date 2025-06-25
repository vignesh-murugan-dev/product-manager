import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getProductById,
  deleteProduct,
} from "../services/productService";
import { useAuth } from "../contexts/AuthContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch product details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !id ||
      !window.confirm("Are you sure you want to delete this product?")
    ) {
      return;
    }

    try {
      setDeleteLoading(true);
      await deleteProduct(id);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Product not found</p>
        <Link
          to="/products"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/products" className="text-blue-600 hover:underline">
          &larr; Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover md:h-auto"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">
              Brand: {product.brand} | Category: {product.category}
            </p>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2">
                Rating: {product.rating}/5
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                In Stock: {product.stock}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {isAuthenticated && (
              <div className="flex space-x-2">
                <Link
                  to={`/product/${product._id}/edit`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Edit Product
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  {deleteLoading ? "Deleting..." : "Delete Product"}
                </button>
              </div>
            )}
          </div>
        </div>

        {product.images && product.images.length > 0 && (
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="h-40 overflow-hidden rounded-md">
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
