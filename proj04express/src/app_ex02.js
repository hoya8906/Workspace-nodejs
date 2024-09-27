// console.log("Hello Node.js!!!");
const { response } = require("express");
const http = require("http");
// const express = require("express");
// const app = express();

const PORT = 3333;

const title = "템플릿을 이용한 출력"
const html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>

<body>
    <h1>${title}</h1>
    <h3>Hello Node.js!!!</h3>
</body>

</html>
`

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" })
    res.end(html);
    // res.end("Hello Node.js!!!");
});

server.listen(PORT, () => {
    console.log(`서버 실행 중 >>> http://localhost:${PORT}`);
});