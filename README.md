# Buying Items in a Web Base / App in an Interior House Setting
Buying items that is in Sims style that is clickable and can buy items like a mall setting. You can go to one store and the store will upload the item or the goods then you can buy it. New experience in buying items.

### Application usage
1. Run `npm install` at folder (do ONLY if first time running app)
2. Run `node index.js` at folder
3. In terminal, click the link `http://localhost:3000` (or something similar)

### Folder usage
- **controllers** - This folder contains files which defines callback functions for client requests. One controller for one .hbs file (one controller for one webpage)
- **models** - This folder contains files for database modeling and access.
- **public**- This folder contains static assets such as css, js, and image files.
- **routes** - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- **views** - This folder contains all hbs files (the webpages) to be rendered when requested from the server.
- **index.js** - The main entry point of the web application.



### Webpage creation process:
1. Create `.hbs` file for the webpage at **views** folder 
    - CSS styles should be at **public/css** folder, images at **public/images** folder
    - Use `.html` instead of `.hbs` if you want to preview how it looks first (change to .hbs later)
    - For page elements reused across different webpages, put it at  **views/partials** folder instead (eg. menu bars)
2. Create a `controller.js` file for the webpage at **controllers** folder (eg. `loginController.js` for `login.hbs`)
    - In this controller file, add all necessary functions for the webpage
    - You can also put functions for the webpage at the **public/js** folder
3. For every function at your `controller.js`, add them to `routes.js` in **routes** folder
    - If function uses GET, use app.get(); if POST, use app.post()