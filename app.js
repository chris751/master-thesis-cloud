const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
    'mongodb://christian:restypimasterthesis@resty-pi-db-shard-00-00-6exid.mongodb.net:27017,resty-pi-db-shard-00-01-6exid.mongodb.net:27017,resty-pi-db-shard-00-02-6exid.mongodb.net:27017/test?ssl=true&replicaSet=resty-pi-db-shard-0&authSource=admin&retryWrites=true', 
    {
        useNewUrlParser: true
    }
 );

// Middleware

// Logging
app.use(morgan('dev')) // Prints events to the console
// Body-parser - allows for parsing the body of incomming requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Allow CORS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});  
    }
    next();
});
// Routes that handle incomming requests
app.use('/products', productRoutes); // if 'produts' is the URL foward it to productRoute
app.use('/orders', orderRoutes);

// No path matched --> add an error to the middleware chain
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// Handle errors added to the chain
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message 
        }
    })
});

module.exports = app;
