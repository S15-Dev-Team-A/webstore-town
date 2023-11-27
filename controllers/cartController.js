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

        const [userCart, subtotal] = await getCartItems(req.session.username);

        // get points from amount of money spent
        // PHP 1 = 1 point
        const points = subtotal;

        res.render("cart", {
            cartItems: userCart,
            subtotal: subtotal,
            points: points,
        });
    },

    postRemoveCartItem: async function (req, res) {
        if (!req.session.loggedIn) {
            return;
        }

        const user = await Member.findOne({username: req.session.username}).exec();
        user.shoppingCart.splice(req.body["index"], 1);
        await user.save();
        res.sendStatus(200);
    }
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

module.exports = cartController;
