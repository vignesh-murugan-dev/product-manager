import { Route, Routes } from 'react-router-dom';
import './App.css'
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-6"></main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />

          {/* Private routes */}
          <Route
            path="/product/add"
            element={
              <PrivateRoute>
                <AddProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id/edit"
            element={
              <PrivateRoute>
                <EditProductPage />
              </PrivateRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  )
}

export default App
