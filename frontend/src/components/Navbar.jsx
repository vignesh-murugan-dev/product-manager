import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className="bg-blue-600 text-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Product Manager
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/products" className="hover:text-blue-200">
                        Products
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/product/add" className="hover:text-blue-200">
                                Add Product
                            </Link>
                            <span className="text-blue-200">Hello, {user?.name ?  user?.name : "User"}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-blue-700 hover:text-blue-800 px-4 py-2 rounded">
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-blue-200 bg-white text-blue-600 px-4 py-2 rounded">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
};

export default Navbar;