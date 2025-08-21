import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={6}>
                    <Card>
                        <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                        <CardContent>
                            <Typography gutterBottom variant="h5">{product.name}</Typography>
                            <Typography variant="h6">₹ {product.price.toFixed(2)}/-</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" onClick={() => addToCart(product)}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default HomePage;