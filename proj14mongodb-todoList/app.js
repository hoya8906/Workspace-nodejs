const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));

app.set("PORT", 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// DB 준비 및 연동
const dbClient = new MongoClient("mongodb://localhost:27017");
const dbName = "todolist";
const collectionName = "todo";

// 목록 보기
app.get("/todo", async (req, res) => {
    try {
        await dbClient.connect();

        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const data = todos.find({}, { sort: {}, projection: {} });

        const todoList = await data.toArray();

        req.app.render("TodoList", { todoList }, (err, html) => {
            if (err) throw err;
            res.end(html);
        });
    } finally {
        await dbClient.close();
    }
})

// 상세 보기
app.get("/todo/detail", async (req, res) => {
    const _id = req.query.id;

    try {
        await dbClient.connect();

        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const todo = await todos.findOne({ _id: new ObjectId(_id) }, {});

        // console.log(todo);

        await req.app.render("TodoDetail", { todo }, (err, html) => {
            if (err) throw err;
            res.end(html);
        });
    } finally {
        await dbClient.close();
    }
})

// 완료 처리
app.get("/todo/done", async (req, res) => {
    const _id = new ObjectId(req.query.id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);

        const todoItem = await todos.findOne({ _id });
        let revDone = todoItem ? !todoItem.done : false; // done 값이 존재하면 반전

        // done 값을 업데이트
        await todos.updateOne({ _id }, { $set: { done: revDone } });

        res.redirect("/todo");
    } catch (error) { throw error; } finally {
        await dbClient.close();
    }
});

// 새 항목 입력 화면
app.get("/todo/input", async (req, res) => {
    await req.app.render("TodoInput", {}, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
})

// DB에 새 Todo 등록
app.post("/todo/input", async (req, res) => {

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const { title } = req.body;
        const done = false;
        const reply = [];

        await todos.insertOne({ title, done, reply });

        await res.redirect("/todo")
    } finally {
        await dbClient.close();
    }
})

// 수정 페이지
app.get("/todo/modify", async (req, res) => {
    const _id = new ObjectId(req.query.id);
    // console.log(_id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const todo = await todos.findOne({ _id }, {});

        await req.app.render("TodoModify", { todo }, (err, html) => {
            if (err) throw err;
            res.end(html);
        });
    } finally {
        await dbClient.close();
    }
})

// DB 수정
app.post("/todo/modify", async (req, res) => {
    const { id, title, done } = req.body;
    const _id = new ObjectId(id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);

        const todo = await todos.findOne({ _id }, {});
        await todos.updateOne({ _id }, { $set: { title } });
        await res.redirect("/todo")
    } finally {
        dbClient.close();
    }
})

// 삭제 처리
app.get("/todo/delete", async (req, res) => {
    const _id = new ObjectId(req.query.id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);

        await todos.deleteOne({ _id }, {});

        await res.redirect("/todo")
    } finally {
        dbClient.close();
    }
})

// 댓글 등록
app.post("/todo/reply", async (req, res) => {
    const { id, newReply } = req.body;
    const _id = new ObjectId(id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const todo = await todos.findOne({ _id }, {});
        todo.reply.push({ repId: todo.reply.length + 1, context: newReply });

        await todos.updateOne({ _id }, { $set: { reply: todo.reply } });
        await res.redirect("/todo/detail/?id=" + todo._id);
    } finally {
        dbClient.close();
    }
})

// 댓글 삭제
app.get("/todo/reply", async (req, res) => {
    const { id, replyId } = req.query;
    // console.log(replyId)
    const _id = new ObjectId(id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const todo = await todos.findOne({ _id }, {});
        todo.reply = todo.reply.filter((e) => e.repId != replyId);

        await todos.updateOne({ _id }, { $set: { reply: todo.reply } });
        await res.redirect("/todo/detail/?id=" + todo._id);
    } finally {
        dbClient.close();
    }
})

const server = http.createServer(app);
server.listen(app.get("PORT"), () => {
    console.log(`Server Run : http://localhost:${app.get("PORT")}`);
})