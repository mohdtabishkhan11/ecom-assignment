import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State for handling login errors
    const [error, setError] = useState('');

    // Get the login function from our authentication context
    const { login } = useContext(AuthContext);
    // Hook for programmatic navigation
    const navigate = useNavigate();

    /**
     * Handles the form submission event.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default browser refresh
        setError(''); // Reset any previous errors

        try {
            // Send a POST request to the server's login endpoint
            const response = await axios.post('http://localhost:5000/api/login', { email, password });

            // If the request is successful, call the login function from the context
            // This will update the global state to reflect that the user is logged in
            login(response.data.user);

            // Redirect the user to the homepage after successful login
            navigate('/');

        } catch (err) {
            // If the server responds with an error (e.g., 401 Unauthorized), display it
            console.error('Login failed:', err.response?.data?.message || err.message);
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto', // Center the form horizontally
                mt: 8,      // Margin top
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                Login
            </Typography>

            {/* Display an error message if the login fails */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Typography textAlign="center">
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
