const Product = require("../models/Product");

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    // Validate fields
    if (!title || !description || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      description,
      category,
      image,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
};

module.exports = { getProducts, addProduct };
