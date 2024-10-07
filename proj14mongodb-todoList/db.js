const { MongoClient } = require("mongodb");

let db;
const client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true });

client.connect()
    .then(() => {
        db = client.db("todolist");
        console.log("Connected to MongoDB");
    })
    .catch(error => console.error(error));

// 컬렉션 접근을 위한 함수
const getTodoCollection = () => db.collection("todo");

module.exports = { getTodoCollection };
