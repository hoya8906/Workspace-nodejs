const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.use(cors());

router.route("/").get((req, res) => {
    res.send("<h1>User List</h1>");
});

app.use("/", router);

module.exports = app;