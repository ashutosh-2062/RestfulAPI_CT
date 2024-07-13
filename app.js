const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

let products = [];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


// Create a new product
app.post('/products', (req, res) => {
    const product = req.body;
    product.id = products.length + 1;
    products.push(product);
    res.status(201).send(product);
  });
  
  // Get all products
  app.get('/products', (req, res) => {
    res.send(products);
  });
  
  // Get a single product by ID
  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    res.send(product);
  });
  
  // Update a product by ID
  app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex === -1) {
      return res.status(404).send('Product not found');
    }
  
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
  
    res.send(updatedProduct);
  });
  
  // Delete a product by ID
  app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
  
    if (productIndex === -1) {
      return res.status(404).send('Product not found');
    }
  
    products.splice(productIndex, 1);
  
    res.status(204).send();
  });