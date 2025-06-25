import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Product Manager</h1>
      <p className="text-xl mb-8">
        A complete MERN stack application to manage products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="text-left list-disc pl-6">
            <li>User authentication with JWT</li>
            <li>CRUD operations for products</li>
            <li>Data fetching from external API</li>
            <li>Responsive design with Tailwind CSS</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Technologies</h2>
          <ul className="text-left list-disc pl-6">
            <li>MongoDB for database</li>
            <li>Express.js for backend</li>
            <li>React for frontend</li>
            <li>Node.js for runtime</li>
            <li>TypeScript for type safety</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Link
          to="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Browse Products
        </Link>

        {isAuthenticated ? (
          <Link
            to="/products/add"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Add New Product
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
