var mongoose = require('mongoose');                                             // import module `mongoose`
const mongoose_fuzzy_searching = require('@rowboat/mongoose-fuzzy-searching');  // For search functionality

var memberSchema = new mongoose.Schema({    // defines the schema / model for the application's user accounts called Members
    username: {                             // Used as the unique identifier (ID) for each user as well as used to login
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    email: {      
        type: String,
        required: true
    },
    displayName: {                          // Name displayed on profiles / shops
        type: String,
        required: true
    },
    dp: {                                   // Profile picture
        data: Buffer,
        contentType: String,
    },
    accountType:{                           // Determines if account is an Affiliate, Merchant, or a Shopper
        type: String,
        required: true
    }
});

memberSchema.plugin(mongoose_fuzzy_searching, { fields: ['displayName'] }); // Add search functionality to a Member's displayName

const Member = mongoose.model('Member', memberSchema);                      // Automatically creates collection called "Members" in database
module.exports = { Member };                                                // Export schemas
