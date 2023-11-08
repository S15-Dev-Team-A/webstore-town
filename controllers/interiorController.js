/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const interiorController = {
    getInteriorPage: function (req, res) {
        res.render("interior");
    },
};

module.exports = interiorController;
