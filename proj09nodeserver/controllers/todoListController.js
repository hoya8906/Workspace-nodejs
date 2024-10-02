const TodoDAO = require("../models/todoModel");
let seqId = TodoDAO.findAll().length + 1;

module.exports.getAllTodolist = (req, res) => {
    const todoList = TodoDAO.findAll();
    try { res.status(200).json(todoList); }
    catch (err) { res.status(500).json({ "message": "getAllTodos 오류" }) }
}

module.exports.getTodoById = (req, res) => {
    const id = req.params.id;
    const todo = TodoDAO.findById(id);
    try { res.status(200).json(todo); }
    catch (err) { res.status(500).json({ "message": "getTodoById 오류" }) }
}

module.exports.addNewTodo = (req, res) => {
    const id = seqId++;
    const data = req.body;
    const newTodo = {
        id: id,
        title: data.title,
        done: data.done,
    }
    const todo = TodoDAO.create(newTodo);
    try { res.status(200).json(todo); }
    catch (err) { res.status(500).json({ "message": "addNewTodo 오류" }) }
}

module.exports.modifyTodoById = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updateTodo = {
        title: data.title,
        done: data.done,
    }
    const todo = TodoDAO.update(id, updateTodo);
    try { res.status(200).json(todo); }
    catch (err) { res.status(500).json({ "message": "modifyTodo 오류" }) }
}

module.exports.deleteTodoById = (req, res) => {
    const id = req.params.id;
    const todo = TodoDAO.delete(id);
    try { res.status(200).json(todo); }
    catch (err) { res.status(500).json({ "message": "deleteTodo 오류" }) }
}