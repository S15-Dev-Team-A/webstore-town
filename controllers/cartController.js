const { Member, Product } = require("../models/schemas");

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const cartController = {
    getCart: async function (req, res) {
        if (!req.session.loggedIn) {
            // alert("Log in to an account first to view your cart!");
            res.redirect("/login");
            return;
        }

        const [cartItems, subtotal] = await getCartItems(req.session.username);

        // get points from amount of money spent
        // PHP 1 = 1 point
        const points = subtotal;

        res.render("cart", {
            cartItems: cartItems,
            subtotal: subtotal,
            points: points,
        });
    },

    getCheckout: async function (req, res) {
        if (!req.session.loggedIn) {
            // alert("Log in to an account first to view your cart!");
            res.redirect("/login");
            return;
        }

        const [checkoutItems, subtotal] = await getCheckoutItems(
            req.session.username
        );

        // redirect to cart if there are no items
        if (checkoutItems.length <= 0) {
            res.redirect("/mycart");
            return;
        }

        // get points from amount of money spent
        // PHP 1 = 1 point
        const points = subtotal;

        res.render("checkout", {
            checkoutItems: checkoutItems,
            subtotal: subtotal,
            points: points,
        });
    },

    postRemoveCartItem: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({
            username: req.session.username,
        }).exec();
        user.shoppingCart.splice(req.body["index"], 1);
        await user.save();
        res.sendStatus(200);
    },

    postAddCartItemQty: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({
            username: req.session.username,
        }).exec();

        const index = req.body["index"];
        user.shoppingCart[index].quantity += 1;
        user.markModified("shoppingCart");
        await user.save();
        res.sendStatus(200);
    },

    postMinusCartItemQty: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({
            username: req.session.username,
        }).exec();

        const index = req.body["index"];
        user.shoppingCart[index].quantity -= 1;

        // if quantity is <= 0, remove the item instead
        if (user.shoppingCart[index].quantity <= 0) {
            user.shoppingCart.splice(index, 1);
        }

        user.markModified("shoppingCart");
        await user.save();
        res.sendStatus(200);
    },

    postSetItemVariation: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({
            username: req.session.username,
        }).exec();

        const index = req.body["index"];
        const variant = req.body["variant"];

        user.shoppingCart[index].variant = variant;
        user.markModified("shoppingCart");
        await user.save();
        res.sendStatus(200);
    },

    postSetItemInclusion: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({
            username: req.session.username,
        }).exec();

        const index = req.body["index"];
        const includeItem = req.body["includeItem"];

        user.shoppingCart[index].includeItem = includeItem;
        user.markModified("shoppingCart");
        await user.save();
        res.sendStatus(200);
    },

    postSetAllItemInclusion: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({
            username: req.session.username,
        }).exec();

        const includeItem = req.body["includeItem"];
        const len = user.shoppingCart.length;
        for (let i = 0; i < len; i++) {
            user.shoppingCart[i].includeItem = includeItem;
        }
        user.markModified("shoppingCart");
        await user.save();
        res.sendStatus(200);
    },
};

const getCartItems = async function (username) {
    const user = await Member.findOne({
        username: username,
    }).exec();

    const cartItems = [];
    var subtotal = 0;
    const shoppingCart = user.shoppingCart;
    for (const item of shoppingCart) {
        const product = await Product.findOne({
            productID: item.productID,
        }).exec();

        // ignore no longer existing products
        if (product == null) {
            continue;
        }

        const cartItem = {
            productID: product.productID,
            includeItem: item.includeItem,
            itemImageBuffer: product.productPicture.data.toString("base64"),
            itemName: product.productName,
            itemMerchant: product.merchantBrand,
            itemDescription: product.description,
            itemVariants: product.variations,
            itemSelectedVariant: item.variant,
            itemDefaultPrice: product.cost,
            itemNonDiscountedPrice: product.cost,
            itemDiscountedPrice: product.discount
                ? product.cost - product.cost * product.discount
                : -1,
            itemQuantity: item.quantity,
            itemTotalPrice: product.discount
                ? (product.cost - product.cost * product.discount) *
                  item.quantity
                : product.cost * item.quantity,
        };

        subtotal += cartItem.itemTotalPrice;
        cartItems.push(cartItem);
    }

    return [cartItems, subtotal];
};

const getCheckoutItems = async function (username) {
    const user = await Member.findOne({
        username: username,
    }).exec();

    const checkoutItems = [];
    var subtotal = 0;
    const shoppingCart = user.shoppingCart;
    for (const item of shoppingCart) {
        const product = await Product.findOne({
            productID: item.productID,
        }).exec();

        // ignore no longer existing products
        if (product == null) {
            continue;
        }

        // ignore non-selected items in cart
        if (!item.includeItem) {
            continue;
        }

        const checkoutItem = {
            itemImageBuffer: product.productPicture.data.toString("base64"),
            itemName: product.productName,
            itemMerchant: product.merchantBrand,
            itemSelectedVariant: item.variant,
            itemDescription: product.description,
            itemUnitPrice: product.discount
                ? product.cost - product.cost * product.discount
                : product.cost,
            itemQuantity: item.quantity,
            itemTotalPrice: product.discount
                ? (product.cost - product.cost * product.discount) *
                  item.quantity
                : product.cost * item.quantity,
        };

        subtotal += checkoutItem.itemTotalPrice;
        checkoutItems.push(checkoutItem);
    }

    return [checkoutItems, subtotal];
};

module.exports = cartController;
