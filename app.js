const express = require('express');
const app = express();
const { accessDB } = require('./models/index');
const productRoutes = require('./routes/productRoutes');

accessDB()
    .then(() => {
        console.log("Database connection completed successfully");
    }).catch((err) => {
        console.log("Failed to connect database: " + err.message);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/product', productRoutes);

const server = require('http').createServer(app);
const PORT = 5001;

server.listen(PORT, () => {
    console.log('Listening on port:', PORT)
})