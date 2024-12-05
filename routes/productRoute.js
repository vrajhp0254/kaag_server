const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, handleContactForm } = require("../controllers/productControllers");

const router = express.Router();

// GET all products
router.get("/", getProducts);

// POST a new product
router.post("/", addProduct);

// PUT update a product by ID
router.put("/:id", updateProduct);

// DELETE a product by ID
router.delete("/:id", deleteProduct);

// POST contact form submission
router.post("/contact", handleContactForm);

module.exports = router;
