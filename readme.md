# Product Manager (MERN Stack)

## Overview

Product Manager is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). The app allows users to sign up, log in, and manage a collection of products with full CRUD (Create, Read, Update, Delete) functionality. It is designed to demonstrate modern web development practices, including RESTful API design, secure authentication, and responsive UI development.

## Key Features

- **User Authentication:** Secure sign up and login using JWT-based authentication.
- **Product Management:** Users can add, view, edit, and delete products.
- **Data Integration:** Product data is initially fetched from the [dummyJSON Product API](https://dummyjson.com/products) and stored in a MongoDB database.
- **RESTful API:** The backend exposes endpoints for all product and user operations.
- **Responsive UI:** The frontend is built with React and styled using Tailwind CSS for a clean and responsive experience.

## How It Works

Upon first setup, the application fetches product data from the dummyJSON API and seeds the MongoDB database. Users can then register for an account, log in, and manage products through an intuitive web interface. All product operations are performed via RESTful API calls to the backend, which handles authentication and data validation.

## Technologies Used

- **Frontend:** React, React Router, Context API, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose, JWT for authentication
- **Database:** MongoDB (local or MongoDB Atlas)
- **External API:** [dummyJSON Product API](https://dummyjson.com/products)

## Project Structure

- **/backend:** Express server, API routes, controllers, models, and authentication logic.
- **/frontend:** React application with pages for authentication and product management.

## Features

- **User Authentication:** Sign Up and Login functionality
- **Product Management:** Create, Read, Update, and Delete (CRUD) products
- **Data Fetching:** Fetches product data from the [dummyJSON Product API](https://dummyjson.com/products) and stores it in MongoDB
- **Responsive UI:** Built with Tailwind CSS

---

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- (Optional) Yarn

### Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/product-manager.git
   cd product-manager
   ```

2. **Backend Setup**

   - Install dependencies:

     ```sh
     cd backend
     npm install
     ```

   - Configure environment variables in `.env`:

     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_EXPIRES_IN=1d
     ```

   - Start the backend server:

     ```sh
     npm run dev
     ```

3. **Frontend Setup**

   - Install dependencies:

     ```sh
     cd ../frontend
     npm install
     ```

   - Start the frontend development server:

     ```sh
     npm run dev
     ```

---

## License

MIT