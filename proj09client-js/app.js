const express = require("express");
const app = express();
const serveStatic = require("serve-static");
const path = require("path");

app.set("PORT", 8085)

app.use("/", serveStatic(path.join(__dirname, "public")));

module.exports = app;