const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();
const { getTodoCollection } = require("../db");

// 목록 보기
router.get("/", async (req, res, next) => {
    try {
        const todos = getTodoCollection();
        const data = todos.find({}).sort({});
        const todoList = await data.toArray();
        req.app.render("TodoList", { todoList }, (err, html) => {
            if (err) return next(err);
            res.send(html);
        });
    } catch (err) {
        next(err);
    }
});

// 상세 보기
router.get("/detail", async (req, res, next) => {
    const _id = req.query.id;
    try {
        const todos = getTodoCollection();
        const todo = await todos.findOne({ _id: new ObjectId(_id) });
        req.app.render("TodoDetail", { todo }, (err, html) => {
            if (err) return next(err);
            res.send(html);
        });
    } catch (err) {
        next(err);
    }
});

// 완료 처리
router.get("/done", async (req, res, next) => {
    const _id = new ObjectId(req.query.id);
    try {
        const todos = getTodoCollection();
        const todoItem = await todos.findOne({ _id });
        let revDone = todoItem ? !todoItem.done : false; // done 값 반전
        await todos.updateOne({ _id }, { $set: { done: revDone } });
        res.redirect("/todo");
    } catch (err) {
        next(err);
    }
});

// // 새 항목 입력 화면
// router.get("/input", (req, res, next) => {
//     req.app.render("TodoInput", {}, (err, html) => {
//         if (err) return next(err);
//         res.send(html);
//     });
// });

// DB에 새 Todo 등록
router.post("/input", async (req, res, next) => {
    const { title } = req.body;
    const done = false;
    const reply = [];
    try {
        const todos = getTodoCollection();
        await todos.insertOne({ title, done, reply });
        res.redirect("/todo");
    } catch (err) {
        next(err);
    }
});

// 수정 페이지
router.get("/modify", async (req, res, next) => {
    const _id = new ObjectId(req.query.id);
    try {
        const todos = getTodoCollection();
        const todo = await todos.findOne({ _id });
        req.app.render("TodoModify", { todo }, (err, html) => {
            if (err) return next(err);
            res.send(html);
        });
    } catch (err) {
        next(err);
    }
});

// DB 수정
router.post("/modify", async (req, res, next) => {
    const { id, title } = req.body;
    const _id = new ObjectId(id);
    try {
        const todos = getTodoCollection();
        await todos.updateOne({ _id }, { $set: { title } });
        res.redirect("/todo");
    } catch (err) {
        next(err);
    }
});

// 삭제 처리
router.get("/delete", async (req, res, next) => {
    const _id = new ObjectId(req.query.id);
    try {
        const todos = getTodoCollection();
        await todos.deleteOne({ _id });
        res.redirect("/todo");
    } catch (err) {
        next(err);
    }
});

// 댓글 등록
router.post("/reply", async (req, res, next) => {
    const { id, newReply } = req.body;
    const _id = new ObjectId(id);
    try {
        const todos = getTodoCollection();
        const todo = await todos.findOne({ _id });
        todo.reply.push({ repId: newReply[0] + (todo.reply.length + 1), context: newReply });
        await todos.updateOne({ _id }, { $set: { reply: todo.reply } });
        res.redirect(`/todo/detail/?id=${todo._id}`);
    } catch (err) {
        next(err);
    }
});

// 댓글 삭제
router.get("/reply", async (req, res, next) => {
    const { id, replyId } = req.query;
    const _id = new ObjectId(id);
    try {
        const todos = getTodoCollection();
        const todo = await todos.findOne({ _id });
        todo.reply = todo.reply.filter(e => e.repId != replyId);
        await todos.updateOne({ _id }, { $set: { reply: todo.reply } });
        res.redirect(`/todo/detail/?id=${todo._id}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;