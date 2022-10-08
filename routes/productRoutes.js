const router = require('express').Router();

const { createProduct, updateProduct, deleteProduct, getProduct, getProducts } = require('../controllers/productController');

//Create Product
router.post("/", createProduct)

//Get Products
router.get("/", getProducts)

//Get a Product
router.get("/:productId", getProduct)

//Update Product
router.put("/", updateProduct)

//Delete Product
router.delete('/:productId', deleteProduct)

module.exports = router