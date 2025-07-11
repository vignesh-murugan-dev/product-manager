import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    // Get the token at the time of the request
    const token = localStorage.getItem("token");
    
    const response = await axios.post(`${API_URL}/products`, productData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.data.product;
}

// Update a product
export const updateProduct = async (id, productData) => {
    // Get the token at the time of the request
    const token = localStorage.getItem("token");
    
    const response = await axios.patch(`${API_URL}/products/${id}`, productData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.data.product;
}

// Delete a product
export const deleteProduct = async (id) => {
    // Get the token at the time of the request
    const token = localStorage.getItem("token");
    
    const response = await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.data;
}

// Seed products from dummyJSON API
export const seedProducts = async (clear) => {
    // Get the token at the time of the request
    const token = localStorage.getItem("token");
    
    const url = clear
        ? `${API_URL}/seed/products?clear=true`
        : `${API_URL}/seed/products`;

    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.message;
}
