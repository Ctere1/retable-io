const express = require('express');
const app = express();

const productRoutes = require('./routes/productRoutes');

const { accessDB } = require('./models/retable');
const setupDB = async () => {
    app.locals.database = await accessDB();
}
setupDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/product', productRoutes);

const server = require('http').createServer(app);
const PORT = 5001;

server.listen(PORT, () => {
    console.log('listening to port', PORT)
})