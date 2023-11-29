// import module `express`
const express = require("express");

// import `controller` modules from `../controllers/controller.js`
// one controller is responsible for one .hbs file (one controller for one webpage)
const mainController = require("../controllers/mainController.js"); // For index.js (base controller)
const loginController = require("../controllers/loginController.js");
const registerController = require("../controllers/registerController.js");
const logoutController = require("../controllers/logoutController.js");
const interiorController = require("../controllers/interiorController.js");
const productlistController = require("../controllers/productlistController.js");
const cartController = require("../controllers/cartController.js");
const houselistController = require("../controllers/houselistController.js");
const profileController = require("../controllers/profileController.js");


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

// logoutController.js functions
// for the /logout webpage
app.get("/logout", logoutController.getLogoutUser);
app.post("/logout", logoutController.postLogoutUser);

app.get("/interior", interiorController.getInteriorPage);
app.get("/room1", interiorController.getRoom1Page);
app.get("/room2", interiorController.getRoom2Page);
app.get("/room3", interiorController.getRoom3Page);
app.get("/room4", interiorController.getRoom4Page);
app.get("/hoverProduct", interiorController.hoverProduct);
app.get("/clickProduct", interiorController.clickProduct);

// cartController.js functions
app.get("/mycart", cartController.getCart);
app.post("/removeCartItem", cartController.postRemoveCartItem);
app.post("/addCartItemQty", cartController.postAddCartItemQty);
app.post("/minusCartItemQty", cartController.postMinusCartItemQty);
app.post("/setItemVariation", cartController.postSetItemVariation);
app.post("/setItemInclusion", cartController.postSetItemInclusion);
app.post("/setAllItemInclusion", cartController.postSetAllItemInclusion);
app.get("/checkout", cartController.getCheckout);

// productlistController.js functions
app.get("/productlist", productlistController.getproductlistPage);

//houselistController.js functions
app.get("/houselist", houselistController.gethouselistPage);

//profileController.js functions
app.get("/profile", profileController.getProfilePage);
app.get("/editprofile", profileController.getEditProfile);
app.post("/updateProfile", profileController.updateProfile);
app.post("/checkPassword", profileController.checkPassword);

module.exports = app;
