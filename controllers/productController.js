const { getFormattedTime } = require('../helpers/timeConvertion');
const Product = require('../models/Product');

//Create product with unique Id
const createProduct = async (req, res) => {
    try {
        const { name, id, inventory } = req.body;
        const time = getFormattedTime();

        //Check ID (do not create duplicate product with same ID)
        exists = await Product.get(id);
        if (exists.id != '') {
            res.status(400).json('Can not create the product with duplicate productId: ' + id);
            return;
        }

        let product = {
            name: name,
            id: id,
            inventory: inventory,
            updated_at: time,
            created_at: time
        };

        //DB save
        await Product.create(product);

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

//Get products
const getProducts = async (req, res) => {
    try {
        result = await Product.getAll();
        res.status(200).json({ count: result.count, products: result.products })
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

//Get a product
const getProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        product = await Product.get(productId);

        if (product.id == '') {
            res.status(404).json('Could not found the product with productId: ' + productId);
            return;
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

//Update the product
const updateProduct = async (req, res) => {
    try {
        const { name, id, inventory } = req.body;
        const time = getFormattedTime();

        product = await Product.get(id, true);
        if (product.id == '') {
            res.status(404).json('Could not find product with productId: ' + id);
            return;
        }
        product.updated_at = time;
        product.name = name;
        product.inventory = inventory;

        //DB update
        await Product.update(product);

        delete product.row_id;

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

//Delete the product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        product = await Product.get(productId, true);
        if (product.id == '') {
            res.status(404).json('Could not find product with productId: ' + id);
            return;
        }

        //DB delete
        await Product.delete(product);

        res.status(200).json(`Product: '${productId}' deleted.`);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getProducts }