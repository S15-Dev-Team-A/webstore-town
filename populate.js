const db = require('./models/db.js');
var fs = require('fs');

/*
    name of the collection (table)
    to perform CRUD (Create, Read, Update, Delete) operations
*/
const {Member, Product, House} = require('./models/schemas.js');


/*
    calls the function createDatabase()
    defined in the `database` object in `./models/db.js`
*/

populate();

async function populate(){
await db.connect();

// Adding KitKat as an affiliate
var memberNew = {
    username: "kitkat04",
    pw: "kitkatchocolate",
    displayName: "Kitkat",
    accountType: "Affiliate",
    dp:{
        data: 1,
        contentType: '',
    },
};

memberNew.dp.data = fs.readFileSync('./public/images/sample_users/kitkat.jpg')
memberNew.dp.contentType = 'image/jpg';

await db.insertOne(Member, memberNew);


// Adding KitKat's house
var houseNew = {
    houseID: "00000001",
    ownerName: "Kitkat",
    houseName: "Kitkat's Home",
    housePicture:{
        data: 1,
        contentType: '',
    },
};

houseNew.housePicture.data = fs.readFileSync('./public/images/sample_house.png');
houseNew.housePicture.contentType = 'image/png';

await db.insertOne(House, houseNew);


// Adding 5 sample products


var productNew = {
    productID: "00000001",
    productName: "Duffel Bag",
    cost: 2400,
    variations: [ "White", "Black" ],
    merchantBrand: "Adidas",
    productPicture:{
        data: 1,
        contentType: '',
    },
};
productNew.productPicture.data = fs.readFileSync('./public/images/sample_products/duffelbag.png');
productNew.productPicture.contentType = 'image/png';

await db.insertOne(Product, productNew);

var productNew = {
    productID: "00000002",
    productName: "Air Max Sneakers",
    cost: 8099,
    variations: [ "White", "Red" ],
    merchantBrand: "Nike",
    productPicture:{
        data: 1,
        contentType: '',
    },
};
productNew.productPicture.data = fs.readFileSync('./public/images/sample_products/airmax.png');
productNew.productPicture.contentType = 'image/png';

await db.insertOne(Product, productNew);

var productNew = {
    productID: "00000003",
    productName: "Work Laptop",
    cost: 16499,
    variations: [ "Default" ],
    merchantBrand: "Samsung",
    productPicture:{
        data: 1,
        contentType: '',
    },
};
productNew.productPicture.data = fs.readFileSync('./public/images/sample_products/laptop.png');
productNew.productPicture.contentType = 'image/png';

await db.insertOne(Product, productNew);

var productNew = {
    productID: "00000004",
    productName: "Polo Shirt",
    cost: 5450,
    variations: [ "Red", "Blue", "Yellow", "White", "Black", "Green"],
    merchantBrand: "Lacoste",
    productPicture:{
        data: 1,
        contentType: '',
    },
};
productNew.productPicture.data = fs.readFileSync('./public/images/sample_products/poloshirt.png');
productNew.productPicture.contentType = 'image/png';

await db.insertOne(Product, productNew);

var productNew = {
    productID: "00000005",
    productName: "Sofa Chair",
    cost: 5990,
    variations: [ "Yellow", "Gray"],
    merchantBrand: "IKEA",
    productPicture:{
        data: 1,
        contentType: '',
    },
};
productNew.productPicture.data = fs.readFileSync('./public/images/sample_products/sofachair.png');
productNew.productPicture.contentType = 'image/png';

await db.insertOne(Product, productNew);



}