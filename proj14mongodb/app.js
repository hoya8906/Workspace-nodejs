const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));

app.set("port", 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


// db 준비 및 연동
const dbClient = new MongoClient("mongodb://localhost:27017");
const dbName = "vehicle";
const collectionName = "car";

// 페이지 이동 함수
const forward = (req, res, target, obj) => {
    req.app.render(target, obj, (err, html) => {
        if (err) throw err;
        res.end(html);
    })
}

// 목록 출력
app.get('/car', async (req, res) => {
    try {
        await dbClient.connect();

        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const cursor = cars.find({}, { sort: { name: 1 }, projection: {} });

        const carList = await cursor.toArray();
        forward(req, res, 'CarList', { carList });
    } finally {
        await dbClient.close();
    }
});

// 상세보기
app.get("/car/detail", async (req, res) => {
    // 파라미터로 id를 받고 값 검색해서 가져오기
    const _id = req.query.id;
    console.log(_id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const car = await cars.findOne({ _id: new ObjectId(_id) }, {});

        forward(req, res, "CarDetail", { car })
    } finally {
        await dbClient.close();
    }
})

// 수정하기
app.get("/car/modify", async (req, res) => {
    const _id = req.query.id;
    console.log(_id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const car = await cars.findOne({ _id: new ObjectId(_id) }, {});

        await forward(req, res, "CarModify", { car })
    } finally {
        await dbClient.close();
    }
})

// 삭제하기
app.get("/car/delete", async (req, res) => {
    const _id = req.query.id;
    console.log(_id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const car = await cars.deleteOne({ _id: new ObjectId(_id) }, {});

        res.redirect("/car")
    } finally {
        await dbClient.close();
    }
})

// 새 데이터 입력 페이지로 forward
app.get('/car/input', (req, res) => {
    forward(req, res, 'CarInput', {});
});


// DB에 데이터 저장
app.post("/car/input", async (req, res) => {
    try {
        await dbClient.connect();

        // 전달된 데이터를 body에서 가져오기
        // 받아온 데이터를 DB에 저장
        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const { name, price, company, year } = req.body;

        await cars.insertOne({ name, price, company, year });

        // 저장 후 목록으로 redirect
        await res.redirect("/car")
    } finally {
        dbClient.close();
    }
})

// DB에 데이터 수정
// bodyParser 미들웨어가 먼저 준비되어야 함
app.post("/car/modify", async (req, res) => {
    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const cars = db.collection(collectionName);
        const { id, name, price, company, year } = req.body;

        await cars.updateOne({ _id: new ObjectId(id) }, { $set: { name, price, company, year } });
        await res.redirect("/car")
    } finally {
        dbClient.close();
    }
})

const server = http.createServer(app);

server.listen(app.get("port"), () => {
    console.log(`서버 실행 중: http://localhost:${app.get("port")}`);
})
