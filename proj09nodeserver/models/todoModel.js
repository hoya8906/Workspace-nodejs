let todoList = [
    { id: 1, title: "밥 먹기", done: true },
    { id: 2, title: "살 빼기 위해 달리기", done: false },
];

let seqId = todoList.length + 1;

// 어차피 한 번만 사용하는 객체라면 객체 리터럴 사용

const TodoDAO = {

    findAll: () => {
        return [...todoList];
    },
    findById: (id) => {
        const idx = todoList.findIndex((todo) => todo.id == id);
        console.log(idx);
        if (idx !== -1) return [todoList[idx]];
    },
    create: (dto) => {
        todoList.push(dto);
        console.log(dto);
        return [...todoList];
    },
    update: (id, dto) => {
        const idx = todoList.findIndex((todo) => todo.id == id);
        console.log(idx, dto);
        if (idx !== -1) todoList[idx] = dto;
        return [...todoList];
    },
    delete: (id) => {
        const idx = todoList.findIndex((todo) => todo.id == id);
        console.log(idx)
        if (idx !== -1) todoList.splice(idx, 1);
        console.log(todoList)
        return [...todoList];
    },
};

module.exports = TodoDAO;