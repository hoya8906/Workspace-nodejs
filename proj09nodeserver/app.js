const express = require("express");
const app = express();
const cors = require("cors");
const productsRouter = require("./router/products");
const todoRouter = require("./router/todolist");

app.use(cors()); // 다른 포트에서도 js로 접속 가능하도록 한다.
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("PORT", 3000);

// 한글 처리 필터 미들웨어
// res.send() 사용시 필요 없음
// app.use((req, res, next) => {
//     res.writeHead(200, { "Content-type": "text/html; charset=UTF-8" });
//     next();
// })

app.use(productsRouter);
app.use(todoRouter);
module.exports = app;