const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/Webtown-Testing');  // Connect to database
const connection = mongoose.connection;             // Store database as a variable
const db = require('../models/db.js');


/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const houselistController = {

    gethouselistPage: async function (req, res) {

        let membercoll = connection.db.collection("members");

        var AllAffiliates = [];
        var AllMembers = await membercoll.find({}).toArray();

        for (const member of AllMembers) {
            if (member.accountType == "Affiliate") {
                AllAffiliates.push(member);
            }
        }

        let houseID, house;
 
        for (const affiliate of AllAffiliates ){
            houseID = "00000001"; // set all to kitkat's house for now
            house = await connection.db.collection("houses").findOne({ houseID: houseID });

            affiliate.houseIMGType = house.housePicture.contentType;
            affiliate.houseBuffer = house.housePicture.data.toString('base64');

            affiliate.dpIMGType = affiliate.dp.contentType;
            affiliate.dpBuffer = affiliate.dp.data.toString('base64');
        }

        res.render('houselist', {AllAffiliates});
    }
}

module.exports = houselistController;