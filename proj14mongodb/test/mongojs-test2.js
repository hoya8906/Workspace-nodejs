const http = require("http");
const mongojs = require("mongojs");
const db = mongojs("vehicle", ["car"]);


const server = http.createServer((req, res) => {
    db.car.find((err, data) => {
        // console.log(data);
        let html = `
        <table border='1'>
        <thead>
        <tr>
        <th>No</th><th>Name</th><th>Price</th><th>Company</th><th>Year</th>
        </tr>
        </thead>
        `;
        html += data.map((car, i) => {
            return `
            <tr>
            <td>${i+1}</td>
            <td>${car.name}</td>
            <td>${car.price}</td>
            <td>${car.company}</td>
            <td>${car.year}</td>
            </tr>
            `
        }).join("");

        html += "</table>";
        res.end(html);
    });
});

server.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:" + 3000);
})