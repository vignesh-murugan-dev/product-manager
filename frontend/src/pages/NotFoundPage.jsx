import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
