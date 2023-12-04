const mongoose = require("mongoose");  // Connect to database
const connection = mongoose.connection;             // Store database as a variable
const db = require('../models/db.js');
const {Member} = require('../models/schemas.js');
const fs = require('fs');
const bcrypt = require('bcrypt');

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const profileController = {
    getProfilePage: async function (req, res) {


        let userId = req.query.id;      // userId parameter when entering profile page (/profile?id=0000)

            // inserting database into function
            let usercoll = connection.db.collection("members");

            // collecting data associated with userId
            let user = await usercoll.findOne({'username': userId});

            // error handler if the user is not found -- (testing)
            if (!user) {
                res.render('error');
            }

            user.imgType = user.dp.contentType;
            user.imgBuffer = user.dp.data.toString('base64')

            if(user.accountType === "Shopper") user.isShopper = true;
            if(user.accountType === "Affiliate") user.isAffiliate = true;
            if(user.accountType === "Merchant") user.isMerchant = true;

            res.render('profile', {user});
    },

    getEditProfile: async function (req,res) {

            let usercoll = connection.db.collection("members");
            let userId = Number(req.query.userId);

            var loggeduser;
            if(req.session.userId){
                loggeduser = await usercoll.findOne({'username': req.session.userId})         // Find a userId that matches the logged user's Id, returns the user
                loggeduser.loggedIn = true;                                                 // Attach logger data to loggeduser (for rendering in hbs)
                loggeduser.dpBuffer = loggeduser.dp.data.toString('base64');                // Attach dp data to loggeduser (for rendering in hbs)
            }

            res.render('editprofile', {userId, loggeduser});

    },


    updateProfile: async function (req, res) {


            /** Conditions regarding updating the profile */
                // if username or bio is empty do not change it
                // if password does not match the password of the userid in the db, return password error
                // if username or bio matches that found in the db, return no changes occured error
            //console.log(req.body.data)
            // load user data
            console.log(req.body.newpw);

            let username = req.body.username;
            let newpw = req.body.newpw;
            var picture;
            if(req.body.picdata) picture = Buffer.from(req.body.picdata, 'base64');
            var dp={
                data: picture,
                contentType: req.body.pictype
            };

            //console.log(req.body.fd);

            //console.log(req.body.picfile);

            // update username in user if form contained text
            let result1=false, result2=false, result3 = false;
            if (username != ""){
                result1 = await db.updateOne(Member,{'username': req.session.username}, {displayName: username});
            }

            // update password in user if form contained text
            if (newpw != ""){
                if (!validatePassword(newpw)) {
                    res.send(false);
                    
                    return;
                }
    
                const SALT_WORK_FACTOR = 10;
                const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                const hash = await bcrypt.hash(newpw, salt);
                result2 = await db.updateOne(Member,{'username': req.session.username}, {pw: hash});
            }

            if (dp.data && dp.contentType){
                result3 = await db.updateOne(Member,{'username': req.session.username},{dp: dp});
                req.session.dpType = dp.contentType;
                req.session.dpBuffer = dp.data.toString('base64');
            }
            
            res.send(result1.acknowledged || result2.acknowledged || result3.acknowledged);
    },

    checkPassword: async function (req, res) {
            const unhashed_pw = req.body.pw;
            const user = await db.findOne(Member, {'username': req.session.username});
            bcrypt.compare(unhashed_pw, user.pw, function(err, equal){
                console.log(equal);
                res.send(equal);
            });

    },



};


const validatePassword = function (password) {
    // from https://stackoverflow.com/a/3802238
    const re =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-._])(?=\S+$).{8,}$/;
    return re.test(password);
};

module.exports = profileController;