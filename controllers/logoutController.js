/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const logoutController = {
    getLogoutUser: function (req, res) {
        req.session.destroy();
        res.redirect("/");
    },

    postLogoutUser: async function (req, res) {
        req.session.destroy();
        res.redirect("/");
    },
};

module.exports = logoutController;
