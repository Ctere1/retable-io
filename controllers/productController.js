const { accessDB } = require('../models/retable')
const base_url = "https://api.retable.io/v1/public";
const axios = require('axios');
require('dotenv').config();

//Create product with unique Id
const createProduct = async (req, res) => {
    try {
        const database = await accessDB();
        // console.log(database);
        const { name, id, inventory } = req.body;

        //Check ID (do not create duplicate product with same ID)
        exists = await checkExist(database, id);
        if (exists.id != '') {
            res.status(400).json('Can not create the product with duplicate productId: ' + id);
            return;
        }

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

        res.status(200).json(`Product: '${id}' created.`);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}

//Get a product
const getProduct = async (req, res) => {
    const database = await accessDB();
    const productId = req.params.productId;

    exists = await checkExist(database, productId);

    if (exists.id != '') {
        res.json(exists)
    } else {
        res.status(400).json('Could not found the product with productId: ' + productId);
    }
}

//Update the product
const updateProduct = async (req, res) => {
    try {
        const database = await accessDB();
        const { name, id, inventory } = req.body;

        product = await checkExist(database, id, true);

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

        //Update the product
        let response2 = await axios(base_url + '/retable/' + database.table_id + '/data', {
            method: 'PUT',
            headers: {
                'ApiKey': process.env.API_KEY
            },
            data: {
                rows: [{
                    row_id: product.row_id,
                    columns: [
                        { column_id: columnsArr['Name'], update_cell_data: name },
                        { column_id: columnsArr['Inventory'], update_cell_data: inventory }
                    ]
                }]
            }
        });
        product.name = name;
        product.id = id;
        product.inventory = inventory;
        delete product.row_id;

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}

//Delete the product
const deleteProduct = async (req, res) => {
    try {
        const database = await accessDB();
        const productId = req.params.productId;

        product = await checkExist(database, productId, true);

        //Delete the product
        let response2 = await axios(base_url + '/retable/' + database.table_id + '/data', {
            method: 'DELETE',
            headers: {
                'ApiKey': process.env.API_KEY
            },
            data: {
                row_ids: [product.row_id]
            }
        });
        res.status(200).json(`Product: '${productId}' deleted.`);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
}

async function checkExist(database, productId, getRowId = false) {
    //GET the retable and grab the column ids
    let response = await axios(base_url + '/retable/' + database.table_id, {
        method: 'GET',
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })
    let columnsArr = [];
    response.data.data.columns.forEach(element => {
        columnsArr[element.column_id] = element.title;
    });

    //Get row values.
    let response2 = await axios(base_url + '/retable/' + database.table_id + '/data', {
        method: 'GET',
        headers: {
            'ApiKey': process.env.API_KEY
        }
    })

    let product = { name: '', id: '', inventory: '' };
    response2.data.data.rows.forEach(element => {
        element.columns.forEach(column => {
            switch (columnsArr[column.column_id]) {
                case 'Id':
                    if (column.cell_value == productId) {
                        product.id = column.cell_value
                        if (getRowId) {
                            product.row_id = element.row_id
                        }
                    };
                    break;
                case 'Name':
                    product.name = column.cell_value
                    break;
                case 'Inventory':
                    product.inventory = column.cell_value
                    break;
            }
        });
    });
    return product;
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct }