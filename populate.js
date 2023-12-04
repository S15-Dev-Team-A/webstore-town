const db = require("./models/db.js");
var fs = require("fs");

/*
    name of the collection (table)
    to perform CRUD (Create, Read, Update, Delete) operations
*/
const { Member, Product, House } = require("./models/schemas.js");

/*
    calls the function createDatabase()
    defined in the `database` object in `./models/db.js`
*/

populate();

async function populate() {
    await db.connect();

    // drop existing tables before inserting

    // Adding KitKat as an affiliate
    var memberNew = {
        username: "kitkat04",
        pw: "$2b$10$xKdGiDlCRBVEOO.s8ddHXe3zQlDIi2k298bmYURtqBuldArE4WJlC",
        displayName: "Kitkat",
        accountType: "Affiliate",
        dp: {
            data: 1,
            contentType: "",
        },
    };

    memberNew.dp.data = fs.readFileSync(
        "./public/images/sample_users/kitkat.jpg"
    );
    memberNew.dp.contentType = "image/jpg";

    await db.insertOne(Member, memberNew);

    // Adding KitKat's house
    var houseNew = {
        houseID: "00000001",
        ownerName: "Kitkat",
        houseName: "Kitkat's Home",
        housePicture: {
            data: 1,
            contentType: "",
        },
        pointCost: 5000,
    };

    houseNew.housePicture.data = fs.readFileSync(
        "./public/images/sample_house_2.png"
    );
    houseNew.housePicture.contentType = "image/png";

    await db.insertOne(House, houseNew);

    // Adding 5 additional sample affiliates


    // Adding products
    
    var productNew = {
        productID: "00000001",
        productName: "Parcel Pushchair",
        description: "Anywhere, anytime and any mood, parcel™ is always travel ready with an easily activated compact fold.",
        cost: 24999,
        variations: ["Oyster", "Eclipse", "Pine", "Carbon"],
        merchantBrand: "Joie Signature",
        productPicture: {
            data: 1,
            contentType: "",
        },
        discount: .10
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000001.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000002",
        productName: "Alpha 2",
        description: "Platinum Karaoke is raising the bar in entertainment experience in Alpha 2. We present to you another All-in-one package that will surely fulfill all  your entertainment needs.",
        cost: 30995,
        variations: ["Default"],
        merchantBrand: "Platinum Karaoke",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000002.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000003",
        productName: "Coffee Drink Mix",
        description: "VitaGold Coffee Drink Mix with Beta-Glucan and Herbal Extracts is a yummy and healthy alternative to a regular 3-in-1 Coffee. It contains 1,3-1,6 Beta-Glucan, Malunggay, Spinach, Acai Berry and Sweetened by Stevia.",
        cost: 250,
        variations: ["Default"],
        merchantBrand: "VitaGold",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000003.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000004",
        productName: "Tinted Sunscreen",
        description: "Designed to address the undeniable effects of sun exposure, this innovative product is a must-have addition to your daily routine.",
        cost: 399,
        variations: ["Default"],
        merchantBrand: "Blanc Pro",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000004.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000005",
        productName: "Airtight Food Storage Container",
        description: "An airtight, leakproof, one touch button, BPA-free, stackable food storage container",
        cost: 272,
        variations: ["Default"],
        merchantBrand: "Ankou",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000005.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000006",
        productName: "Teddy Bear",
        description: "Cuddly Bear! Super Soft and Fluffy!",
        cost: 350,
        variations: ["Default"],
        merchantBrand: "Macxy's Fun Toys",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000006.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000007",
        productName: "Honey Bunny",
        description: "As cuddly as a plush toy, this cute little rabbit is the perfect companion for the kids. A multi-functional digital player that is specially designed for children, the Honey Bunny can be used as early educational assistant (through the playback of stories, songs and poems) and a toy.",
        cost: 2400,
        variations: ["Blue", "Pink", "Red"],
        merchantBrand: "Alilo",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000007.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000008",
        productName: "Nutribaby(+)",
        description: "This 6-in-1 Multi-Purpose Baby Food Processor is the must-have for varied, tasty meals!",
        cost: 12500,
        variations: ["Loft White", "Industrial Grey"],
        merchantBrand: "babymoov",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/products/00000008.png"
    );
    productNew.productPicture.contentType = "image/png";
    await db.insertOne(Product, productNew);

    process.exit(0);
}
