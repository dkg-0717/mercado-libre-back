const express = require("express");
const productController = require("../../controllers/productController");

const router = express.Router();

router
  .get("/api/items?", productController.getProductsByName)
  .get("/api/items/:id", productController.getProductById)

module.exports = router;
