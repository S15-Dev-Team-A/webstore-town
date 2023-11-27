/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/

const mongoose = require("mongoose");
//mongoose.connect('mongodb://127.0.0.1/Kahit-Ano');  // Connect to database
const connection = mongoose.connection; // Store database as a variable

const db = require("../models/db.js");

const { Product, Member } = require("../models/schemas.js");

const interiorController = {
    getInteriorPage: function (req, res) {
        res.render("interior");
    },

    getRoom1Page: function (req, res) {
        res.render("room1");
    },

    getRoom2Page: function (req, res) {
        res.render("room2");
    },

    getRoom3Page: function (req, res) {
        res.render("room3");
    },

    getRoom4Page: function (req, res) {
        res.render("room4");
    },

    hoverProduct: async function (req, res) {
        prodid = req.query.prodid;

        var result = await db.findOne(Product, { productID: prodid });
        // <img src="data:${result.productPicture.contentType};base64, ${result.productPicture.data}" width="75px" height="75px">
        result.imgType = result.productPicture.contentType;
        result.imgBuffer = result.productPicture.data.toString("base64");
        output = `
        <div style="    margin-top:0px;
        height:420px;
        border-radius: 15px;
        background-color: #ffffff;
        border: 2px solid black;
        max-width:200px;
        padding:15px;">
            <div class="hori">
                <div class="vert">
                    <img src="data:${result.imgType};base64, ${
            result.imgBuffer
        }" width="200px" height="200px">
                </div>
            </div>
            <hr class="separator">
                <div class="vert" style="justify-content: space-between;">
                        <p style="color:black; margin-top: 5px; margin-bottom:-10px; font-size:25px; font-weight:700;">${result.productName.toUpperCase()} </p>
                        <p style="color:black; margin-top: 10px; margin-bottom:-10px;">by ${
                            result.merchantBrand
                        } </p>
                        <p style="color:black; margin-top: 20px; margin-bottom:20px; font-size:20px; font-weight:450;">${
                            result.cost
                        } PHP </p>
                        <p style="color:black; margin-top: -20px; margin-bottom:20px; font-size:20px; font-weight:450;">Has ${
                            result.variations.length
                        } variations</p>
                    
                </div>

        </div>
        `;

        res.send(output);
    },

    clickProduct: async function (req, res) {
        prodid = req.query.prodid;

        var product = await db.findOne(Product, { productID: prodid });

        if (req.session.loggedIn) {
            var shopper = await db.findOne(Member, {
                username: req.session.username,
            });

            // Push product to their shopping cart
            shopper.shoppingCart.push({
                productID: product.productID,
                variant: product.variations[0], // first variation of item by default
                quantity: 1, // by default, only one
                includeItem: true,
            });

            await shopper.save();

            output = true; // Logged in, added to cart successfully
        } else {
            output = false; // Not logged in, do not add to cart
        }
        res.send(output);
    },
};

module.exports = interiorController;
