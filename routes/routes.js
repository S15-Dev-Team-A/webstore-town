// import module `express`
const express = require("express");

// import `controller` modules from `../controllers/controller.js`
// one controller is responsible for one .hbs file (one controller for one webpage)
const mainController = require("../controllers/mainController.js"); // For index.js (base controller)
const loginController = require("../controllers/loginController.js");
const registerController = require("../controllers/registerController.js");
const interiorController = require("../controllers/interiorController.js");

const app = express();

// mainController.js functions
app.get("/favicon.ico", mainController.getFavicon); //  execute function getFavicon() defined in object `mainController` in `../controllers/MainController.js` when a client sends an HTTP GET request for `/favicon.ico`
app.get("/", mainController.getHomePage); //  execute function getHome() defined in object `MainController` in `../controllers/MainController.js` when a client sends an HTTP GET request for `/`

// loginController.js functions
// for the /login webpage
app.get("/login", loginController.getLoginPage);
app.post("/login", loginController.postLoginUser);

// registerController.js functions
// for the /register webpage
app.get("/register", registerController.getRegisterPage);
app.post("/register", registerController.postRegisterUser);

app.get("/interior", interiorController.getInteriorPage);

// const authRouter = require("./auth");
// app.use("/api/auth", authRouter);

module.exports = app;
