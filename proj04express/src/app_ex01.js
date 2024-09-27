// console.log("Hello Node.js!!!");
const { response } = require("express");
const http = require("http");
// const express = require("express");
// const app = express();

const PORT = 3333;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" })
    res.write("<!DOCTYPE html>");
    res.write("<html></html>");
    res.write("<head><title>첫 번째 Node.js 서버</title></head>");
    res.write("<body>");
    res.write("<h1>Hello Node.js World!!!</h1>");
    res.write("<h3>안녕하세요? 반갑습니다.</h3>");
    res.write("</body>");
    res.write("</html>");
    res.end();
});

server.listen(PORT, () => {
    console.log(`서버 실행 중 >>> http://localhost:${PORT}`);
});