import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    E-Commerce Store
                </Typography>
                {user ? (
                    <>
                        <Typography sx={{ mr: 2 }}>Welcome, {user.email}</Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                )}
                <Button color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={totalItems} color="error">
                        <ShoppingCart />
                    </Badge>
                </Button>
                
                <Button color="inherit" component={Link} to="/admin">Admin</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;