const express = require('express');
const app = express();
const databaseRoutes = require('./routes/databaseRoutes')
const productRoutes = require('./routes/productRoutes')
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/database', databaseRoutes);
app.use('/api/product', productRoutes);

const server = require('http').createServer(app);
const PORT = 5001;

server.listen(PORT, () => {
    console.log('listening to port', PORT)
})