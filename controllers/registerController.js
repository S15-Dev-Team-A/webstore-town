/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const registerController = {

    getRegisterPage: function (req, res) {
        // render `../views/register.hbs`
        res.render('register'); // Refers to register.hbs
    }


}


module.exports = registerController;