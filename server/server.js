// Import necessary modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Initialize the Express application
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) so your React frontend can communicate with this server
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- File Paths ---
// Define the absolute path to the 'data' directory
const dataPath = path.join(__dirname, 'data');
// Define paths to each of our JSON "database" files
const productsFilePath = path.join(dataPath, 'products.json');
const usersFilePath = path.join(dataPath, 'users.json');
const ordersFilePath = path.join(dataPath, 'orders.json');

// --- Helper Function to Read Files ---
// A simple function to read and parse a JSON file to avoid repetition.
const readJsonFile = (filePath) => {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error reading file from path: ${filePath}`, error);
    return []; // Return an empty array if file doesn't exist or is empty
  }
};

// --- API Endpoints ---

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
app.get('/api/products', (req, res) => {
  const products = readJsonFile(productsFilePath);
  res.json(products);
});

/**
 * @route   POST /api/signup
 * @desc    Register a new user
 * @access  Public
 */
app.post('/api/signup', (req, res) => {
  const users = readJsonFile(usersFilePath);
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Check if user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  // Create new user object
  const newUser = {
    id: Date.now(), // Use a timestamp for a simple unique ID
    email,
    password, // In a real app, you MUST hash the password!
  };

  // Add the new user and write back to the file
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  // Respond with success message and the new user data (excluding password)
  res.status(201).json({
    message: 'User created successfully!',
    user: { id: newUser.id, email: newUser.email }
  });
});

/**
 * @route   POST /api/login
 * @desc    Authenticate a user
 * @access  Public
 */
app.post('/api/login', (req, res) => {
    const users = readJsonFile(usersFilePath);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = users.find(u => u.email === email);

    // Check if user exists and if password matches
    if (!user || user.password !== password) { // In a real app, compare hashed passwords!
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // On successful login, send back user data (excluding password)
    res.status(200).json({
        message: 'Login successful!',
        user: { id: user.id, email: user.email }
    });
});


/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private (should be protected in a real app)
 */
app.post('/api/orders', (req, res) => {
  const orders = readJsonFile(ordersFilePath);
  const newOrder = req.body; // Expects { userId, items, address, total }

  // Add server-side generated data to the order
  newOrder.id = Date.now();
  newOrder.date = new Date().toISOString();

  // Add the new order and write back to the file
  orders.push(newOrder);
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

  res.status(201).json({
    message: 'Order placed successfully!',
    order: newOrder
  });
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders (for admin)
 * @access  Private (should be protected in a real app)
 */
app.get('/api/orders', (req, res) => {
  const orders = readJsonFile(ordersFilePath);
  // In a real app, you might sort orders by date
  const sortedOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(sortedOrders);
});


// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
