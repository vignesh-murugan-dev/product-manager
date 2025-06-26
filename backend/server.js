import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import route handlers
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";

// Create Express app
const app = express();

// Middleware
app.use((req, res, next) => {
  // Get the origin from the request
  const origin = req.headers.origin;
  console.log('Request origin:', origin);

  // Set CORS headers for all responses
  res.header('Access-Control-Allow-Origin', origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return res.status(200).end();
  }

  return next();
});

// Apply JSON middleware after CORS
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Health check route for Vercel
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok', message: 'Product Manager API is running' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);

// Handle potential singular/plural mismatch in endpoints
app.use('/api/product', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;

// Only start the server in development mode
// In production (Vercel), the serverless function will be used
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express app for Vercel
export default app;
