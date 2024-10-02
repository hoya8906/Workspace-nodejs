const http = require("http");
const app = require("./app");

const server = http.createServer(app);
server.listen(app.get("PORT"), () => {
    console.log("서버 실행중... http://localhost:" + app.get("PORT"));
})