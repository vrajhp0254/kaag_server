const Product = require("../models/Product");
const nodemailer = require("nodemailer");

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

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from URL
    const { title, description, category, image } = req.body; // Get updated data from request body

    // Validate fields
    if (!title || !description || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find product by ID and update
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, category, image },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from URL

    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

// Handle contact form submission
const handleContactForm = async (req, res) => {
  try {
    console.log("ahsdof");
    const { 
      companyName,
      fullName,
      email,
      phoneNumber,
      productType,
      productDetail 
    } = req.body;

    // Validate fields
    if (!companyName || !fullName || !email || !phoneNumber || !productType || !productDetail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Product Inquiry from ${companyName}`,
      html: `
        <h3>New Product Inquiry</h3>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Product Type:</strong> ${productType}</p>
        <p><strong>Product Details:</strong></p>
        <p>${productDetail}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Your inquiry has been submitted successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Failed to submit inquiry", error });
  }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct, handleContactForm };
