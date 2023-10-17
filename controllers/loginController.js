/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const loginController = {

    getLoginPage: function (req, res) {
        // render `../views/login.hbs`
        res.render('login'); // Refers to login.hbs
    }


}


module.exports = loginController;