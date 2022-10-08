const router = require('express').Router();

const { createProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');

//Create Product
router.post("/", createProduct)

//Get a Product
router.get("/:productId", getProduct)

//Update Product
router.put("/", updateProduct)

//Delete Product
router.delete('/:productId', deleteProduct)

module.exports = router