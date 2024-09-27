import { useState, useEffect } from "react";
import Buttons from './Buttons';
import TodoItem from './TodoItem';

const Container = () => {
    let listArray = [
        { _id: "todo0001", title: "밥 먹고 떡볶이도 먹기", done: false },
        { _id: "todo0002", title: "커피에 밥 말아먹기", done: true },
        { _id: "todo0003", title: "살 빼려고 달리기하기", done: false },
        { _id: "todo0004", title: "아이유 콘서트 가기", done: false },
    ];

    const [newTodo, setNewTodo] = useState("");
    const [updating, setUpdating] = useState("");
    const [todoList, setTodoList] = useState(listArray);

    useEffect(() => {
        console.log(todoList);
    }, [todoList]);

    const inputHandler = (e) => setNewTodo(e.target.value);

    const inputKeyHandler = (e) => {
        if (e.keyCode === 13 && e.target.value.trim() !== "") buttonHandler();
    };

    const buttonHandler = () => {
        let lastId = Math.max(...todoList.map(todo => parseInt(todo._id.replace("todo", ""))), 0);
        let newId = "todo" + String(lastId + 1).padStart(4, '0');
        setTodoList([...todoList, { _id: newId, title: newTodo, done: false }]);
        setNewTodo("");
    };

    const updateHandler = (upId) => {
        setTodoList(todoList.map(todo => {
            if (upId === todo._id && newTodo.trim() !== "") todo.title = newTodo;
            return todo;
        }));
    };

    const deleteHandler = (delId) => {
        setTodoList(todoList.filter(todo => todo._id !== delId));
    };

    const doneHandler = (checkId) => {
        setTodoList(todoList.map(todo => {
            if (checkId === todo._id) todo.done = !todo.done;
            return todo;
        }));
    };

    return (
        <div className="container" style={{ marginTop: "30px" }}>
            <h3>새로운 할 일</h3>
            <div className="input-group mb-3">
                <input type="text" className="form-control" value={updating === "" ? newTodo : ""} onChange={inputHandler} onKeyDown={inputKeyHandler} />
                <button className="btn btn-primary" onClick={buttonHandler}>등록</button>
            </div>
            <hr />
            <h3>할 일 목록</h3>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-hover table-borderless">
                    <thead>
                        <tr>
                            {/* <th>번호</th> */}
                            <th className="th col-9">할 일</th>
                            <th className="th col-3">변경</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {todoList.map((todo, index) => ( */}
                        {todoList.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                // index={index}
                                updating={updating}
                                doneHandler={doneHandler}
                                inputHandler={inputHandler}
                                newTodo={newTodo}
                                Buttons={(todo) =>
                                    <Buttons
                                        todo={todo}
                                        updating={updating}
                                        setUpdating={setUpdating}
                                        setNewTodo={setNewTodo}
                                        updateHandler={updateHandler}
                                        deleteHandler={deleteHandler}
                                    />}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Container;
