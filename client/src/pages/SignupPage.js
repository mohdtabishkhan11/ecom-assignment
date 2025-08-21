import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { email, password });
            login(response.data.user); // Log the user in immediately
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error);
            // Handle error display
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant="h4">Sign Up</Typography>
            <TextField margin="normal" required fullWidth label="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
        </Box>
    );
};
export default SignupPage;