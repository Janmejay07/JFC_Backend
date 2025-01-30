import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Predefined Admin credentials (hardcoded)
const adminEmail = process.env.adminE; // Replace with your fixed admin email
const adminPassword = process.env.adminPass; // Replace with your fixed admin password

// Register User
export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validate required fields
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email or username already exists
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });

    if (emailExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    if (usernameExists) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Create new user
    const user = await User.create({ name, username, email, password });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin check
    if (email === adminEmail && password === adminPassword) {
      return res.json({
        message: 'Admin logged in successfully!',
        role: 'admin',
        token: generateToken('admin'), // Admin can have a custom identifier
      });
    }

    // User check
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        username: user.username, // Include username
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        username: user.username, // Include username
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
