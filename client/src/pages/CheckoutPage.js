import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';


const CheckoutPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    const handlePlaceOrder = async () => {
        if (!user) {
            Swal.fire("Please log in to place an order.");
            navigate('/login');
            return;
        }
        const order = {
            userId: user.id,
            items: cartItems,
            address: address,
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        };
        try {
            await axios.post('http://localhost:5000/api/orders', order);
            // alert('Order placed successfully!');
            Swal.fire({
                title: "Good job!",
                text: "Order placed successfully!",
                icon: "success"
            });
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4">Checkout</Typography>
            <TextField label="Shipping Address" fullWidth margin="normal" value={address} onChange={e => setAddress(e.target.value)} required />
            <Typography variant="h6">Dummy Payment Section</Typography>
            <Typography>Payment details would go here.</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handlePlaceOrder}>
                Place Order
            </Button>
        </Box>
    );
};
export default CheckoutPage;