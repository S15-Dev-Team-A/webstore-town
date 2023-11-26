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
    Member.collection.drop();
    Product.collection.drop();
    House.collection.drop();

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
    };

    houseNew.housePicture.data = fs.readFileSync(
        "./public/images/sample_house_2.png"
    );
    houseNew.housePicture.contentType = "image/png";

    await db.insertOne(House, houseNew);

    // Adding 5 additional sample affiliates

    //Sample Affiliate 1
    var memberNew = {
        username: "zeus",
        pw: "$2b$10$DPnW9o5k1LvJhk3wQLfnOOydKDfxhetITvW4ucbK.EdsQn47WfFaa",
        displayName: "Zeus",
        accountType: "Affiliate",
        dp: {
            data: 1,
            contentType: "",
        },
    };

    memberNew.dp.data = fs.readFileSync(
        "./public/images/sample_users/zeus.jpg"
    );
    memberNew.dp.contentType = "image/jpg";

    await db.insertOne(Member, memberNew);

    //Sample Affiliate 2
    var memberNew = {
        username: "oner",
        pw: "$2b$10$a8h25tmviPX4FLDy80Du5uBPGrNBMonuJgvvYbcw9YlNPIrXdja1a",
        displayName: "Oner",
        accountType: "Affiliate",
        dp: {
            data: 1,
            contentType: "",
        },
    };

    memberNew.dp.data = fs.readFileSync(
        "./public/images/sample_users/oner.jpeg"
    );
    memberNew.dp.contentType = "image/jpeg";

    await db.insertOne(Member, memberNew);

    //Sample Affiliate 3
    var memberNew = {
        username: "faker",
        pw: "$2b$10$MSlWoFwON56StF3UHA1lBen7qqIAs8Ba3vxWmcRlKWAmjYRc1RivK",
        displayName: "Faker",
        accountType: "Affiliate",
        dp: {
            data: 1,
            contentType: "",
        },
    };

    memberNew.dp.data = fs.readFileSync(
        "./public/images/sample_users/faker.jpg"
    );
    memberNew.dp.contentType = "image/jpg";

    await db.insertOne(Member, memberNew);

    //Sample Affiliate 4
    var memberNew = {
        username: "gumayusi",
        pw: "$2b$10$cfb7hK6CV6jsm480sb1ycu0EsTQ9CIjEiWcOnpmtpxVKGCLlsMpuS",
        displayName: "Gumayusi",
        accountType: "Affiliate",
        dp: {
            data: 1,
            contentType: "",
        },
    };

    memberNew.dp.data = fs.readFileSync(
        "./public/images/sample_users/guma.jpg"
    );
    memberNew.dp.contentType = "image/jpg";

    await db.insertOne(Member, memberNew);

    //Sample Affiliate 5
    var memberNew = {
        username: "keria",
        pw: "$2b$10$bbIvvRR0vqZGT/KT6fqdT.vjNvNJwSGoa.z9GboWpt/vKKiiAjd4C",
        displayName: "Keria",
        accountType: "Affiliate",
        dp: {
            data: 1,
            contentType: "",
        },
    };

    memberNew.dp.data = fs.readFileSync(
        "./public/images/sample_users/keria.jpg"
    );
    memberNew.dp.contentType = "image/jpg";

    await db.insertOne(Member, memberNew);

    // Adding 5 sample products

    var productNew = {
        productID: "00000001",
        productName: "Duffel Bag",
        description: "A soft oblong bag for personal belongings.",
        cost: 2400,
        variations: ["White", "Black"],
        merchantBrand: "Adidas",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/sample_products/duffelbag.png"
    );
    productNew.productPicture.contentType = "image/png";

    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000002",
        productName: "Air Max Sneakers",
        description:
            "Nike's Air Max shoes are iconic athletic footwear known for their innovative design featuring visible air cushioning units.",
        cost: 8099,
        variations: ["White", "Red"],
        merchantBrand: "Nike",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/sample_products/airmax.png"
    );
    productNew.productPicture.contentType = "image/png";

    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000003",
        productName: "Work Laptop",
        description:
            "Sleek and powerful, Samsung laptops seamlessly combine style and performance for a tech-savvy and efficient computing experience.",
        cost: 16499,
        variations: ["Default"],
        merchantBrand: "Samsung",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/sample_products/laptop.png"
    );
    productNew.productPicture.contentType = "image/png";

    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000004",
        productName: "Polo Shirt",
        description:
            "timeless elegance embodied in a comfortable and iconic design with the signature crocodile logo.",
        cost: 5450,
        variations: ["Red", "Blue", "Yellow", "White", "Black", "Green"],
        merchantBrand: "Lacoste",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/sample_products/poloshirt.png"
    );
    productNew.productPicture.contentType = "image/png";

    await db.insertOne(Product, productNew);

    var productNew = {
        productID: "00000005",
        productName: "Sofa Chair",
        description:
            "A perfect blend of comfort and Scandinavian design, effortlessly enhancing any living space.",
        cost: 5990,
        variations: ["Yellow", "Gray"],
        merchantBrand: "IKEA",
        productPicture: {
            data: 1,
            contentType: "",
        },
    };
    productNew.productPicture.data = fs.readFileSync(
        "./public/images/sample_products/sofachair.png"
    );
    productNew.productPicture.contentType = "image/png";

    await db.insertOne(Product, productNew);

    process.exit(0);
}
