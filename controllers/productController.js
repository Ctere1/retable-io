//Create product
const createProduct = async (req, res) => {

}

//Get a product
const getProduct = async (req, res) => {
    const id = Number(req.params.productID)
    //const product = products.find(product => product.id === id)
    //res.json(product)
}

//Update product
const updateProduct = async (req, res) => {

}

//Delete product
const deleteProduct = async (req, res) => {

}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct }