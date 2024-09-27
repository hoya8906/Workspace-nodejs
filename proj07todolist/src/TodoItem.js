// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, updating, doneHandler, inputHandler, newTodo, Buttons }) => {
    if (updating === todo._id ) todo.done = false;

    return (
        <tr key={todo._id}>
            <td className="todo" style={{
                textDecoration: todo.done ? "line-through" : "none"
            }} onClick={() => doneHandler(todo._id)}>
                {(updating === todo._id ) ?
                    <input className="form-control input-sm" id={todo.id} value={newTodo} onChange={inputHandler} />
                    : todo.title}
            </td>
            <td>
                {Buttons(todo)}
            </td>
        </tr>
    );
};

export default TodoItem;