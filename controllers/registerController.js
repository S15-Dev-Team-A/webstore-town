const bcrypt = require("bcrypt");
const fs = require('fs');

const { Member } = require("../models/schemas");

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const registerController = {
    getRegisterPage: function (req, res) {
        // prevent user from accessing register page when they are logged in
        if (req.session.loggedIn) {
            res.redirect("/");
            return;
        }

        res.render("register");
    },

    postRegisterUser: async function (req, res) {
        try {
            // check if username follows format
            if (!validateUsername(req.body["username"])) {
                res.render("register", {
                    error: "Username format is invalid.",
                });
                return;
            }

            // check if username already exists
            const existingUsername = await Member.findOne({
                username: req.body["username"],
            }).exec();
            if (existingUsername !== null) {
                res.render("register", { error: "Username already exists." });
                return;
            }

            // check if unhashed password is valid
            if (!validatePassword(req.body["password"])) {
                res.render("register", {
                    error: "Password format is invalid.",
                });
                return;
            }

            // hash password
            const SALT_WORK_FACTOR = 10;
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const hash = await bcrypt.hash(req.body["password"], salt);

            // create new Member
            await new Member({
                username: req.body["username"],
                pw: hash,
                displayName: req.body["name"],
                accountType: req.body["accountType"],
                dp:{
                    data: fs.readFileSync('./public/images/profile_icon.jpg'),
                    contentType: 'image/jpg',
                },
                points:0,
                
            }).save();

            req.session.loggedIn = true;
            req.session.username = req.body["username"];

            res.redirect("/");
        } catch (e) {
            console.error(e);
        }
    },
};

const validateUsername = function (username) {
    // from https://stackoverflow.com/a/12019115
    const re = /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return re.test(username);
};

const validatePassword = function (password) {
    // from https://stackoverflow.com/a/3802238
    const re =
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#?!@$%^&*-._])(?=\S+$).{8,}$/;
    return re.test(password);
};

module.exports = registerController;
