const bcrypt = require("bcrypt");

const { Member } = require("../models/schemas");

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const loginController = {
    getLoginPage: function (req, res) {
        // render `../views/login.hbs`
        res.render("login"); // Refers to login.hbs
    },

    postLoginUser: async function (req, res) {
        try {
            // check if username exists and get hashed password if so, otherwise abort
            const existingUsername = await Member.findOne({username: req.body["username"]});
            if (existingUsername === null) {
                res.render("login", {error: "Incorrect username or password. Please try again."});
                return;
            }
    
            // check if hashed password in DB matches the entered password
            const success = await bcrypt.compare(req.body["password"], existingUsername.pw);
            if (!success) {
                res.render("login", {error: "Incorrect username or password. Please try again."});
                return;
            }
    
            console.log("Login successful to be implemented");
            res.render("home");
        } catch (e) {
            console.error(e);
        }
    },
};

module.exports = loginController;
