// src/components/Buttons.js
import React from 'react';

const Buttons = ({ todo, updating, setUpdating, setNewTodo, updateHandler, deleteHandler }) => {
    return (
        <div className="btn-group">
            <button className="btn btn-warning btn-sm" onClick={(e) => {
                if (updating !== todo._id) {
                    setUpdating(todo._id);
                    setNewTodo(todo.title);
                } else {
                    todo.done = false;
                    updateHandler(todo._id);
                    setUpdating("");
                    setNewTodo("");
                }
            }}>
                {updating === todo._id ? "확인" : "수정"}
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => {
                if (updating === todo._id) {
                    setUpdating("");
                } else {
                    deleteHandler(todo._id);
                }
            }}>
                {updating === todo._id ? "취소" : "삭제"}
            </button>
        </div>
    );
};

export default Buttons;