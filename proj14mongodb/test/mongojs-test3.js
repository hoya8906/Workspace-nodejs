const http = require("http");
const mongojs = require("mongojs");
const db = mongojs("vehicle", ["car"]);
const express = require("express");
const app = express();

app.set("port", 3000);

app.get("/", (req,res)=>{
    res.end("<a href='/car'>Car</a>")
})

app.get("/car", (req, res) => {
    db.car.find((err, data) => {
        // console.log(data);
        let html = `
        <table border='1'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Company</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
        `;
        html += data.map((car, i) => {
            return `
            <tr>
                <td>${i + 1}</td>
                <td>${car.name}</td>
                <td>${car.price}</td>
                <td>${car.company}</td>
                <td>${car.year}</td>
            </tr>
            `
        }).join("");
        
        
        html += `
        </tbody>
        </table>
        <a href="../">Back</a>
        `;

        res.end(html);
    });
})

const server = http.createServer(app);

server.listen(app.get("port"), () => {
    console.log(`서버 실행 중: http://localhost:${app.get("port")}`);
})