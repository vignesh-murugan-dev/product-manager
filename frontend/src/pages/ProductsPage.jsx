import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, seedProducts } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seedMessage, setSeedMessage] = useState(null);
  const [seedLoading, setSeedLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSeedProducts = async () => {
    try {
      setSeedLoading(true);
      const message = await seedProducts();
      setSeedMessage(message);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to seed products");
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="space-x-2">
          {isAuthenticated && (
            <button
              onClick={handleSeedProducts}
              disabled={seedLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              {seedLoading ? "Seeding..." : "Seed Products"}
            </button>
          )}
          {isAuthenticated && (
            <Link
              to="/product/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Add Product
            </Link>
          )}
        </div>
      </div>

      {seedMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {seedMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No products found</p>
          {isAuthenticated && (
            <p className="text-gray-600">
              Click "Seed Products" to fetch sample products or "Add Product" to
              create a new one.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {product.title}
                </h2>
                <p className="text-gray-600 mb-2 truncate">{product.brand}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Rating: {product.rating}/5
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  {isAuthenticated && (
                    <Link
                      to={`/product/${product._id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
