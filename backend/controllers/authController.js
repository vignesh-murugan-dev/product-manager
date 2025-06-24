import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Helper function to generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
}

// create and send jwt token
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    
    // Remove password from user object before sending response
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

// signup function to register a new user
const signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        createSendToken(newUser, 201, res);
    } catch (error) {
        next(error);
    }
}

// login function to authenticate a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password!'
            });
        }

        // check if user exists and password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password!'
            });
        }

        // If everything is okay, send the token
        createSendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
}

// middleware to protect routes that require authentication
const protect = async (req, res) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1];

        // Check if token is provided
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from the token
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token does no longer exist.'
            });
        }

        req.user = currentUser; // Attach user to request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid token. Please log in again.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'fail',
                message: 'Token expired. Please log in again.'
            });
        }
        next(error);
    }
}

const authController = {
    signup,
    login,
    protect
};

export default authController;