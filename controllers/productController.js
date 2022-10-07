const { accessDB } = require('../models/retable')
const base_url = "https://api.retable.io/v1/public";
const axios = require('axios');
require('dotenv').config();

//Create product
const createProduct = async (req, res) => {
    try {
        const database = await accessDB();
        // console.log(database);
        const { name, id, inventory } = req.body;

        //GET the retable and grab the column ids
        let response = await axios(base_url + '/retable/' + database.table_id, {
            method: 'GET',
            headers: {
                'ApiKey': process.env.API_KEY
            }
        })
        let columnsArr = [];
        response.data.data.columns.forEach(element => {
            columnsArr[element.title] = element.column_id;
        });

        //POST the product with column ids(mandatory)
        let response2 = await axios(base_url + '/retable/' + database.table_id + '/data', {
            method: 'POST',
            headers: {
                'ApiKey': process.env.API_KEY
            },
            data: {
                data: [{
                    columns: [
                        { column_id: columnsArr['Name'], cell_data: name },
                        { column_id: columnsArr['Id'], cell_data: id },
                        { column_id: columnsArr['Inventory'], cell_data: inventory }
                    ]
                }]
            }
        })

        res.status(200).json(`Product: '${name}' created.`);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}

//Get a product
const getProduct = async (req, res) => {
    // const id = Number(req.params.productId)
    // console.log(id);
    // //const product = products.find(product => product.id === id)
    // res.json(id)
}

//Update product
const updateProduct = async (req, res) => {

}

//Delete product
const deleteProduct = async (req, res) => {

}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct }