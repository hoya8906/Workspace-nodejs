const http = require("http");
const express = require("express");
const mainApp = express();

const productsApp = require("./apps/products")
const usersApp = require("./apps/users")
const ordersApp = require("./apps/orders")
const todolistApp = require("./apps/todolist")

mainApp.use("/products", productsApp);
mainApp.use("/users", usersApp);
mainApp.use("/orders", ordersApp);
mainApp.use("/todo", todolistApp);

const server = http.createServer(mainApp);
server.listen(3001, () => {
    console.log("server run...");
});