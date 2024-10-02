const http = require("http");
const express = require("express");
const mainApp = express();

const productsApp = require("./apps/products")
const usersApp = require("./apps/users")
const ordersApp = require("./apps/orders")

mainApp.use("/products", productsApp);
mainApp.use("/users", usersApp);
mainApp.use("/orders", ordersApp);

const server = http.createServer(mainApp);
server.listen(3001, () => {
    console.log("server run...");
});