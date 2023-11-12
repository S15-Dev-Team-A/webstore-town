const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/Webtown-Testing');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable
const db = require('../models/db.js');
const {Product} = require('../models/schemas.js');


/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const productlistController = {

    getproductlistPage: async function (req, res) {

        let productcoll = connection.db.collection("products");

        var AllProducts;

        AllProducts = await productcoll.find({}, {sort:{productID:-1}}).toArray();

        for (const product of AllProducts ){
            
        }

        res.render('productlist', {AllProducts});
    }
}

module.exports = productlistController;