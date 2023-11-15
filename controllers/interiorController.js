/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const interiorController = {
    getInteriorPage: function (req, res) {
        res.render("interior");
    },

    getRoom1Page: function (req, res) {
        res.render("room1");
    },

    getRoom2Page: function (req, res) {
        res.render("room2");
    },

    getRoom3Page: function (req, res) {
        res.render("room3");
    },

    getRoom4Page: function (req, res) {
        res.render("room4");
    },
};

module.exports = interiorController;
