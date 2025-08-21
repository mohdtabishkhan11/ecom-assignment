import React, { useContext } from 'react';
import { Box, Typography, Button, List, Paper, Grid, Avatar, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Display a message and a link to the homepage if the cart is empty
    if (cartItems.length === 0) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h4" gutterBottom>Your cart is empty.</Typography>
                <Button component={Link} to="/" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Continue Shopping
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, margin: 'auto', p: { xs: 1, sm: 2 } }}>
            <Typography variant="h4" gutterBottom component="h1" sx={{ mb: 3 }}>
                Your Shopping Cart
            </Typography>
            <List>
                {cartItems.map(item => (
                    // Use Paper for a nice card-like effect for each item
                    <Paper key={item.id} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                        <Grid container alignItems="center" spacing={2}>

                            {/* Left Side: Image and Product Name */}
                            <Grid item xs={12} md={5}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar
                                        variant="rounded"
                                        src={item.image}
                                        alt={item.name}
                                        sx={{ width: 80, height: 80, mr: 2 }}
                                    />
                                    <Typography variant="h6" component="div">
                                        {item.name}
                                    </Typography>
                                </Box>
                            </Grid>

                            {/* Right Side: Price, Quantity Controls, and Delete Button */}
                            <Grid item xs={12} md={7}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap', // Allow wrapping on small screens
                                        gap: 2
                                    }}
                                >
                                    <Typography variant="h6" sx={{ minWidth: '100px', fontWeight: 'bold' }}>
                                        ₹{item.price.toFixed(2)}/-
                                    </Typography>

                                    {/* Quantity Controls */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => updateQuantity(item.id, -1)} color="primary" aria-label="decrease quantity">
                                            <Remove />
                                        </IconButton>
                                        <Typography sx={{ mx: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton onClick={() => updateQuantity(item.id, 1)} color="primary" aria-label="increase quantity">
                                            <Add />
                                        </IconButton>
                                    </Box>

                                    {/* Delete Button */}
                                    <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </List>

            {/* Order Summary and Checkout Button */}
            <Box sx={{ mt: 4, p: 2, backgroundColor: 'grey.100', borderRadius: 2, textAlign: 'right' }}>
                <Typography variant="h5" gutterBottom>
                    Subtotal: <span style={{ fontWeight: 'bold' }}>₹{totalPrice.toFixed(2)}/-</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Taxes and shipping calculated at checkout.
                </Typography>
                <Button
                    component={Link}
                    to="/checkout"
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Proceed to Checkout
                </Button>
            </Box>
        </Box>
    );
};

export default CartPage;
