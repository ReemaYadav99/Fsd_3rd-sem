const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to receive JSON data
app.use(express.json());

// Product data
let products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 55000,
        quantity: 10
    },
    {
        id: 2,
        name: "Mobile Phone",
        category: "Electronics",
        price: 25000,
        quantity: 20
    },
    {
        id: 3,
        name: "Notebook",
        category: "Stationery",
        price: 100,
        quantity: 50
    }
];


// 1. GET /products
// Display all products
app.get("/products", (req, res) => {
    res.status(200).json(products);
});


// 2. GET /products/:id
// Display a particular product
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product with this ID not found"
        });
    }

    res.status(200).json(product);
});


// 3. POST /products
// Add a new product
app.post("/products", (req, res) => {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({
            message: "Please provide name, category, price and quantity"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        name: name,
        category: category,
        price: price,
        quantity: quantity
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});


// 4. PUT /products/:id
// Update an existing product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product with this ID not found"
        });
    }

    const { name, category, price, quantity } = req.body;

    products[productIndex] = {
        id: id,
        name: name !== undefined ? name : products[productIndex].name,
        category: category !== undefined ? category : products[productIndex].category,
        price: price !== undefined ? price : products[productIndex].price,
        quantity: quantity !== undefined ? quantity : products[productIndex].quantity
    };

    res.status(200).json({
        message: "Product updated successfully",
        product: products[productIndex]
    });
});


// 5. DELETE /products/:id
// Delete a product
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product with this ID not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});


// 6. GET /products/category/:category
// Filter products by category
app.get("/products/category/:category", (req, res) => {
    const category = req.params.category;

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({
            message: "No products found in this category"
        });
    }

    res.status(200).json(filteredProducts);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});