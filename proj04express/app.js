// console.log("Hello Node.js!!!");
const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

const title = "자동차 목록";

// port 환경 변수 등록
app.set("PORT", 3333);

// 뷰엔진 설정
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static 폴더 설정
app.use(express.static(path.join(__dirname, "public")));

// 데이터베이스에서 가져온 데이터로 대체될 임시 목록
const carList = [
    { _id: 1001, name: "GRANDEUR", price: 3500, company: "HYUNDAI", year: 2019 },
    { _id: 1002, name: "SONATA", price: 2300, company: "HYUNDAI", year: 2022 },
    { _id: 1003, name: "SELTOS", price: 2100, company: "KIA", year: 2020 },
    { _id: 1004, name: "S80", price: 4500, company: "VOLVO", year: 2021 },
];

// 라우팅
app.get("/car/list", (req, res) => {
    res.render("car/list", { carList, title }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});

const PORT = app.get("PORT");
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`서버 실행 중 >>> http://localhost:${PORT}`);
});