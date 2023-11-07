const router = require("express").Router();
const bcrypt = require("bcrypt");

const { Member } = require("../models/schemas");

router.post("/login", (req, res) => {
    res.sendStatus(200);
});

router.post("/register", async (req, res) => {
    try {
        // check if username follows format
        if (!validateUsername(req.body["username"])) {
            console.log("Username format invalid");
            res.status(401).send("Username format invalid");
            return;
        }

        // check if username already exists
        const existingUsername = await Member.findOne({username: req.body["username"]}).exec();
        if (existingUsername !== null) {
            console.log("Username already exists");
            res.status(401).send("Username already exists");
            return;
        }

        // check if unhashed password is valid
        if (!validatePassword(req.body["password"])) {
            console.log("Password format invalid");
            res.status(401).send("Password format invalid");
            return;
        }

        // hash password
        const SALT_WORK_FACTOR = 10;
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(req.body["password"], salt);

        // create new Member
        await new Member({
            username: req.body["username"],
            pw: hash,
            displayName: req.body["name"],
            accountType: req.body["accountType"]
        }).save();

        res.status(200).send("Account registration successful");
    } catch (e) {
        console.error(e);
    }
});

const validateUsername = function (username) {
    // from https://stackoverflow.com/a/12019115
    const re = /^(?=.{8,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    return re.test(username);
};

const validatePassword = function (password) {
    // from https://stackoverflow.com/a/3802238
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    return re.test(password);
}

module.exports = router;
