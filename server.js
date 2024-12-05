require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./routes/productRoute");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Handle large images
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "your-default-mongo-uri";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the app if the database connection fails
  });

// Routes
app.use("/api/products", productRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
