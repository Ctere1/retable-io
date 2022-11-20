require('dotenv').config();
const axios = require('axios');
axios.defaults.headers.common['ApiKey'] = process.env.API_KEY;
const base_url = process.env.BASE_URL;

const Product = {
    create: async function (product) {
        //GET the retable and grab the column ids
        let response = await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID)

        let columnsArr = [];
        response.data.data.columns.forEach(element => {
            columnsArr[element.title] = element.column_id;
        });

        await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID + '/data', {
            method: 'POST',
            data: {
                data: [{
                    columns: [
                        { column_id: columnsArr['Name'], cell_data: product.name },
                        { column_id: columnsArr['Id'], cell_data: product.id },
                        { column_id: columnsArr['Inventory'], cell_data: product.inventory },
                        { column_id: columnsArr['Updated_at'], cell_data: product.updated_at },
                        { column_id: columnsArr['Created_at'], cell_data: product.created_at }
                    ]
                }]
            }
        });


    },

    update: async function (product) {
        //GET the retable and grab the column ids
        let response = await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID)
        let columnsArr = [];
        response.data.data.columns.forEach(element => {
            columnsArr[element.title] = element.column_id;
        });

        //Update the product
        await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID + '/data', {
            method: 'PUT',
            data: {
                rows: [{
                    row_id: product.row_id,
                    columns: [
                        { column_id: columnsArr['Name'], update_cell_data: product.name },
                        { column_id: columnsArr['Inventory'], update_cell_data: product.inventory },
                        { column_id: columnsArr['Updated_at'], update_cell_data: product.updated_at }
                    ]
                }]
            }
        });

    },

    delete: async function (product) {
        //Delete the product
        await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID + '/data', {
            method: 'DELETE',
            data: {
                row_ids: [product.row_id]
            }
        });

    },

    getAll: async function () {
        //GET the retable and grab the column ids
        let response = await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID)
        let columnsArr = [];
        response.data.data.columns.forEach(element => {
            columnsArr[element.column_id] = element.title;
        });

        //Get row values.
        let response2 = await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID + '/data')

        let count = 0;
        let products = [];
        response2.data.data.rows.forEach(element => {
            let product = { name: '', id: '', inventory: '', updated_at: '', created_at: '', };
            if (element.row_id !== 1) {
                element.columns.forEach(column => {
                    switch (columnsArr[column.column_id]) {
                        case 'Id':
                            product.id = column.cell_value;
                            break;
                        case 'Name':
                            product.name = column.cell_value
                            break;
                        case 'Inventory':
                            product.inventory = column.cell_value
                            break;
                        case 'Updated_at':
                            product.updated_at = column.cell_value
                            break;
                        case 'Created_at':
                            product.created_at = column.cell_value
                            break;
                    }
                });
                count++;
                products.push(product);
            }
        });

        let result = {
            products,
            count
        };

        return result;

    },

    get: async function (productId, getRowId = false) {
        //GET the retable and grab the column ids
        let response = await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID)
        let columnsArr = [];
        response.data.data.columns.forEach(element => {
            columnsArr[element.column_id] = element.title;
        });

        //Get row values.
        let response2 = await axios(base_url + '/retable/' + process.env.PRODUCT_TABLE_ID + '/data')

        let product = { name: '', id: '', inventory: '', updated_at: '', created_at: '', };
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
                    case 'Updated_at':
                        product.updated_at = column.cell_value
                        break;
                    case 'Created_at':
                        product.created_at = column.cell_value
                        break;
                }
            });
        });
        return product;

    },

}

module.exports = Product;