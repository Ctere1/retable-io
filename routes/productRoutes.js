const router = require('express').Router();

const { createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');

//Create Product
router.post("/", createProduct)

//Get a Product
router.get("/:productId", getProduct)

//Update Product
router.post("/update", updateProduct)

//Delete Product
router.delete('/', deleteProduct)

module.exports = router