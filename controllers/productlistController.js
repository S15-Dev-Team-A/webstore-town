const mongoose = require("mongoose");
 // Connect to database
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
            product.imgType = product.productPicture.contentType;
            product.imgBuffer = product.productPicture.data.toString('base64')
        }

        res.render('productlist', {AllProducts});
    }
}

module.exports = productlistController;