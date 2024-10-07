const express = require("express");
const path = require("path");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

// 서버 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));

app.set("PORT", 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 라우터 등록 (Todo)
app.use("/todo", todoRoutes);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// 서버 실행
app.listen(app.get("PORT"), () => {
    console.log(`Server Run : http://localhost:${app.get("PORT")}`);
});
