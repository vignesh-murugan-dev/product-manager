import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProduct } from "../services/productService";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    discountPercentage: 0,
    images: [""],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "stock" || name === "discountPercentage") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...(formData.images || [""])];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), ""],
    });
  };

  const removeImageField = (index) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages.length > 0 ? updatedImages : [""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.title ||
      !formData.description ||
      !formData.brand ||
      !formData.category
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const filteredImages = formData.images?.filter((img) => img.trim() !== "") || [];

      await createProduct({
        ...formData,
        images: filteredImages,
      });

      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/products" className="text-blue-600 hover:underline">
          &larr; Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-gray-700 mb-2">
                Brand <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 mb-2">
                Price <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="discountPercentage" className="block text-gray-700 mb-2">
                Discount Percentage
              </label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={formData.discountPercentage || 0}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-gray-700 mb-2">
                Stock <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="thumbnail" className="block text-gray-700 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Product Images</label>

              {formData.images &&
                formData.images.map((image, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="ml-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                    >
                      -
                    </button>
                  </div>
                ))}

              <button
                type="button"
                onClick={addImageField}
                className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
              >
                + Add Image URL
              </button>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/products"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
