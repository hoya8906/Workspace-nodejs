const express = require("express");
const { getTodoById, getAllTodolist, addNewTodo, modifyTodoById, deleteTodoById }
    = require("../controllers/todoListController");
const router = express.Router();

router.route("/todo").get(getAllTodolist)
    .post(addNewTodo)

router.route("/todo/:id").get(getTodoById)
    .post(modifyTodoById)
    .delete(deleteTodoById)

// nodejs 모듈로 등록(app.js 에서 미들웨어로 사용)
module.exports = router;