const express = require("express");
const { getProducts, addProduct } = require("../controllers/productControllers");

const router = express.Router();

// GET all products
router.get("/", getProducts);

// POST a new product
router.post("/", addProduct);

module.exports = router;
