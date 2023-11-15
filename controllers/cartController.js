/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const cartController = {
    getCart: function (req, res) {
        res.render("cart");
    },
};

module.exports = cartController;
