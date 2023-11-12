var mongoose = require('mongoose');                                             // import module `mongoose`
const mongoose_fuzzy_searching = require('@rowboat/mongoose-fuzzy-searching');  // For search functionality

var memberSchema = new mongoose.Schema({    // defines the schema / model for the application's user accounts called Members
    username: {                             // Used as the unique identifier (ID) for each user as well as used to login
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    pw: {
        // hashed password
        type: String,
        required: true,
    },
    displayName: {                          // Name displayed on profiles / shops
        type: String,
        trim: true,
        required: true
    },
    dp: {                                   // Profile picture
        data: Buffer,
        contentType: String,
    },
    accountType:{                           // Determines if account is an Affiliate, Merchant, or a Shopper
        type: String,
        required: true
    },

    transactionHistory:{                    // If shopper, this is an Object Array representing transaction history. Each object is a Product ID and date purchased.
        type: Array,
    },
    sellingProducts:{                       // If affiliate, this is an Object Array representing items being sold at their house. Each object is a Product ID and its sale statistics.
        type: Array,
    },
    points:{
        type: Number,                       // If shopper, this shows number of points user has
    },
    shoppingCart:{                       // If shopper, this is an Object Array representing items in the cart
        type: Array,
    }
});


var productSchema = new mongoose.Schema({    // defines the schema / model for products being sold in the application
    productID: {                             // Used as the unique identifier (ID) for each product
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    productName:{                           // Name of the product
        type: String,
        required: true,
    },
    cost:{                           // Determines the price of the product
        type: Number,
        required:true
    },
    variations: {               // Array of the variations available for the product, if any
        type: Array,
    },
    merchantBrand: {                          // Username of the merchant it belongs to.
        type: String,
        required: true
    },
    productPicture: {                                   // Picture of the product
        data: Buffer,
        contentType: String,
    },
    discount:{                           // Determines the discount of the product, if any
        type: Number,
    },
    sponsoredBy :{                           // Array of all affiliates (represented by their usernames) associated with the product
        type: Array,
    }
});

var houseSchema = new mongoose.Schema({    // defines the schema / model for each house in the application
    houseID: {                             // Used as the unique identifier (ID) for each house
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    ownerName: {    // Username of owner
        type: String,
        required: true,
    },
    houseName: {                          // Name displayed on profiles / shops
        type: String,
        trim: true,
        required: true
    },
    sponsors :{                           // Array of all merchants (represented by their usernames) associated with the products inside the house
        type: Array,
    },
    housePicture: {                                   // Picture of the house
        data: Buffer,
        contentType: String,
    }
});


memberSchema.plugin(mongoose_fuzzy_searching, { fields: ['displayName'] }); // Add search functionality to a Member's displayName
productSchema.plugin(mongoose_fuzzy_searching, { fields: ['productName', 'merchantBrand'] }); 
houseSchema.plugin(mongoose_fuzzy_searching, { fields: ['ownerName', 'houseName'] }); 


const Member = mongoose.model('Member', memberSchema);                      // Automatically creates collection called "Members" in database
const Product = mongoose.model('Product', productSchema);
const House = mongoose.model('House', houseSchema);

module.exports = { Member, Product, House };                                                // Export schemas
