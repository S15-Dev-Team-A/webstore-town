require('dotenv').config();     // Get variables from .env file

// import npm modules
const express = require('express');                     // Express.js
const hbs = require('hbs');                             // Handlebars (for Web pages)
const session = require('express-session');             // Sessions
const mongoose = require('mongoose');                   // Mongoose
const MongoStore = require('connect-mongo')(session);   // Connect Mongo


const routes = require('./routes/routes.js');           // import module `routes` from `./routes/routes.js`
const db = require('./models/db.js');                   // import module `database` from `./model/db.js`

// Set ports and hosts of application
if(process.env.PORT) var PORT = process.env.PORT;       // If .env has PORT variable, set PORT as that
else var PORT = 9090;                                   // if none, set PORT as 9090
const host = '0.0.0.0';

// Set settings of the application, stored as 'app'
const app = express();
app.set('view engine', 'hbs');                                  // sets `hbs` as view engine                    
hbs.registerPartials(__dirname + '/views/partials');            // sets `/views/partials` as folder containing partial hbs files
app.use(express.urlencoded({limit: '50mb', extended: true}));   // parses incoming requests with urlencoded payloads
app.use(express.static('public'));                              // set the folder `public` as folder containing static assets such as css, js, and image files

// use express.json() middleware to parse request body
app.use(express.json());

db.connect();                   // connects to the database
app.use(session({               // use `express-session` for sessions and set its options
    'secret': 'webtown',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})    // use `MongoStore` as server-side session storage
}));

// Define the paths contained in `./routes/routes.js`
app.use('/', routes);

// Errors will render the 'error.hbs' webpage
app.use(function (req, res) {
    res.render('error');
});

// Binds the server to a specific port
app.listen(PORT, host, function () {
    console.log(`Webtown now running at: http://localhost:${PORT}`);
});
