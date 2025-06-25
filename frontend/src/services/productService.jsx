import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all products
export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data.data.products;
};

// Get product by ID
export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data.data.product;
};

// Create a new product
export const createProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data.data.product;
}

// Update a product
export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    return response.data.data.product;
}

// Delete a product
export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data.data;
}

// Seed products from dummyJSON API
export const seedProducts = async (clear) => {
    const url = clear
        ? `${API_URL}/see/products?clear=true`
        : `${API_URL}/seed/products`;

    const response = await axios.get(url);
    return response.data.message;
}