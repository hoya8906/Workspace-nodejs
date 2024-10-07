# 실습 과제: Todo-List(댓글 기능 추가)

## 미리 보기

![TodoList.ejs](./images/image.png)

TodoList.ejs

![새 할일 추가 Button 클릭 시 입력 창 펼쳐짐](./images/image%201.png)

새 할일 추가 Button 클릭 시 입력 창 펼쳐짐

![Todo Title 클릭 시 취소선](./images/image%202.png)

Todo Title 클릭 시 취소선

![TodoDetail.ejs : 댓글 추가 및 삭제 기능](./images/image%203.png)

TodoDetail.ejs : 댓글 추가 및 삭제 기능

## 전체 코드

### app.js

```jsx
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
```

### TodoList.ejs

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body style="text-align: center;">
    <div class="container">
        <h1>Todo-List</h1>
        <form action="/todo/input" method="get" style="display: none;">
            <button type="submit" class="btn btn-primary mb-3">새 할일</button>
        </form>
        <button data-toggle="collapse" data-target="#newTodo" class="btn btn-success mb-3">새 할 일 추가</button>
        <div id="newTodo" class="collapse">
            <form action="/todo/input" method="post">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" name="title" value="">
                    <div class="input-group-append">
                        <button type="submit" class="btn btn-success">저장</button>
                    </div>
                </div>
            </form>
        </div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th hidden>id</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <% todoList.forEach(todo=> { %>
                    <tr>
                        <td hidden>
                            <%= todo._id %>
                        </td>
                        <td style="text-decoration: <%= todo.done ? 'line-through' : 'none' %>;">
                            <a href="/todo/done/?id=<%= todo._id %>">
                                <%= todo.title %>
                            </a>
                            <span class="badge badge-primary badge-pill">
                                <%= todo.reply.length %>
                            </span>
                        </td>
                        <td>
                            <a href="/todo/detail?id=<%= todo._id %>">
                                <button class="btn btn-outline-warning btn-sm">
                                    자세히
                                </button>
                            </a>
                        </td>
                    </tr>
                    <% }) %>
            </tbody>

        </table>
    </div>
</body>

</html>
```

### TodoDetail.ejs

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body style="text-align: center;">
    <h1>상세 페이지</h1>

    <div class="container">
        <form action="/todo/" method="get">
            <button type="submit" class="btn btn-outline-info mb-3">전체 목록으로 돌아가기</a>
        </form>
    </div>

    <div class="container">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th hidden>id</th>
                    <th>할 일</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td hidden>
                        <%= todo._id %>
                    </td>
                    <td>
                        <%= todo.title %>
                    </td>
                    <td>
                        <a href="/todo/modify/?id=<%=todo._id%>">수정</a>
                    </td>
                    <td>
                        <a href="/todo/delete/?id=<%=todo._id%>">삭제</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="container">
        <form action="/todo/reply/" method="post">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">새 댓글</span>
                </div>
                <input type="hidden" class="form-control" name="id" value="<%=todo._id%>">
                <input type="text" class="form-control" name="newReply" placeholder="새 댓글 입력">
                <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">등록</button>
                </div>
            </div>
        </form>

        <div>

            <ul class="list-group list-group-flush">
            <% if (todo.reply.length>0) todo.reply.forEach((rep,i)=>{ %>
                    <li class="list-group-item">
                        <div class="input-group">
                            <span class="col-1">
                                <%=i+1%>
                            </span>
                            <span class="col-9">
                                <%=rep.context%>
                            </span>
                            <span class="col-2">
                                <a href="/todo/reply/?id=<%=todo._id%>&replyId=<%=rep.repId%>">삭제</a>
                            </span>
                        </div>
                    </li>
                    <!-- <li class="list-group-item col-2 list=group-item-primary">
                        </li> -->
                        <% }) %>
                    </ul>

        </div>
</body>

</html>
```

### TodoModify.ejs

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>수정 화면</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body style="text-align: center;">
    <div class="container">

        <h1>항목 수정</h1>
        <form action="/todo/modify" method="post">
            <input type="hidden" name="id" value="<%=todo._id%>">
            <div class="input-group mb-3">
                <input type="text" class="form-control" name="title" value="<%=todo.title%>">
            <div class="input-group-append">
                <button type="submit" class="btn btn-primary">저장</button>
            </div>
        </div>
    </form>
</div>
</body>

</html>
```

## 개요

- Express.js와 MongoDB를 사용하여 서버-클라이언트 간의 데이터 관리를 구현
- 주요 기능은 항목 추가, 수정, 삭제, 완료 상태 변경, 세부 항목 보기, 댓글 관리 등

## 주요 파일 구성

- `app.js`: 서버의 메인 파일로 라우팅과 데이터베이스 연동을 담당
- `views`: EJS 템플릿 파일들 (TodoList.ejs, TodoDetail.ejs, TodoModify.ejs 등)
- `public`: 정적 파일을 제공하는 폴더

## `app.js` 주요 코드 및 설명

### 서버 설정 및 MongoDB 연결 설정

```jsx
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

// MongoDB 설정
const dbClient = new MongoClient("mongodb://localhost:27017");
const dbName = "todolist";
const collectionName = "todo";
```

- **MongoDB 설정**: `MongoClient`를 사용해 MongoDB와 연결하고, 데이터베이스 이름을 `todolist`, 컬렉션 이름을 `todo`로 설정한다.
- **Express 설정**: 서버는 EJS를 템플릿 엔진으로 사용하며, 정적 파일은 `public` 디렉토리에서 제공한다.

### 목록 보기 기능 (`/todo`)

```jsx
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
});
```

- **동작**: MongoDB에서 모든 Todo 항목을 검색하고, 결과를 `TodoList.ejs` 템플릿에 전달하여 렌더링한다.
- **핵심 코드**:
    - `find()`: MongoDB 컬렉션에서 모든 항목을 검색하여 `todoList`에 저장.
    - `req.app.render()`: 템플릿 엔진을 사용해 목록 페이지를 렌더링.

### 상세 보기 기능 (`/todo/detail`)

```jsx
app.get("/todo/detail", async (req, res) => {
    const _id = req.query.id;
    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const todo = await todos.findOne({ _id: new ObjectId(_id) }, {});

        req.app.render("TodoDetail", { todo }, (err, html) => {
            if (err) throw err;
            res.end(html);
        });
    } finally {
        await dbClient.close();
    }
});
```

- **동작**: URL에서 전달된 ID 값을 사용하여 특정 Todo 항목을 검색하고, `TodoDetail.ejs`에 해당 데이터를 렌더링.
- **핵심 코드**:
    - `findOne()`: MongoDB에서 특정 항목을 검색하여 자세한 정보를 조회.

### 완료 상태 변경 기능 (`/todo/done`)

```jsx
app.get("/todo/done", async (req, res) => {
    const _id = new ObjectId(req.query.id);
    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);

        const todoItem = await todos.findOne({ _id });
        let revDone = todoItem ? !todoItem.done : false; // done 값 반전

        await todos.updateOne({ _id }, { $set: { done: revDone } });
        res.redirect("/todo");
    } finally {
        await dbClient.close();
    }
});
```

- **동작**: 특정 항목의 `done` 상태를 토글(반전)하여 완료 여부를 업데이트.
- **핵심 코드**:
    - `updateOne()`: 기존 항목의 `done` 값을 반전시키고 이를 데이터베이스에 저장.

### 새 항목 추가 기능 (`/todo/input`)

```jsx
app.post("/todo/input", async (req, res) => {
    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);
        const { title } = req.body;
        const done = false;
        const reply = [];

        await todos.insertOne({ title, done, reply });
        res.redirect("/todo");
    } finally {
        await dbClient.close();
    }
});
```

- **동작**: 사용자가 입력한 Todo 데이터를 받아 MongoDB에 새 항목으로 추가.
- **핵심 코드**:
    - `insertOne()`: 새로운 Todo 항목을 데이터베이스에 추가.

### 항목 수정 기능 (`/todo/modify`)

```jsx
app.post("/todo/modify", async (req, res) => {
    const { id, title } = req.body;
    const _id = new ObjectId(id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);

        await todos.updateOne({ _id }, { $set: { title } });
        res.redirect("/todo");
    } finally {
        dbClient.close();
    }
});
```

- **동작**: Todo 항목의 제목을 수정하고, 변경된 내용을 MongoDB에 업데이트.
- **핵심 코드**:
    - `updateOne()`: 특정 항목의 제목을 업데이트하여 데이터베이스에 반영.

### 항목 삭제 기능 (`/todo/delete`)

```jsx
app.get("/todo/delete", async (req, res) => {
    const _id = new ObjectId(req.query.id);

    try {
        await dbClient.connect();
        const db = dbClient.db(dbName);
        const todos = db.collection(collectionName);

        await todos.deleteOne({ _id }, {});
        res.redirect("/todo");
    } finally {
        dbClient.close();
    }
});
```

- **동작**: 특정 항목을 데이터베이스에서 삭제하고, 변경된 목록을 클라이언트에게 반환.
- **핵심 코드**:
    - `deleteOne()`: 지정된 ID에 해당하는 항목을 데이터베이스에서 제거.

### 댓글 추가 및 삭제 기능

- **댓글 추가** (`/todo/reply`): 댓글 데이터를 Todo 항목의 `reply` 배열에 추가하고, 데이터베이스에 업데이트.
- **댓글 삭제** (`/todo/reply`): `replyId`에 해당하는 댓글을 삭제하고, 나머지 댓글만 남겨 업데이트.

```jsx
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
        res.redirect("/todo/detail/?id=" + todo._id);
    } finally {
        dbClient.close();
    }
});
```

## EJS 템플릿 (클라이언트 측 UI)

### TodoList.ejs

- **목록 UI**: Todo 항목의 제목과 완료 상태를 보여주며, 각 항목에 대한 자세한 정보로 이동할 수 있는 링크 제공.
- **기능 추가**: 새 항목을 바로 추가할 수 있는 폼과 완료 상태를 확인할 수 있는 UI 요소 포함.

### TodoDetail.ejs

- **세부 항목 UI**: 선택된 Todo 항목의 세부 정보를 표시하고, 수정 및 삭제 기능 제공.
- **댓글 관리**: 댓글을 추가 및 삭제할 수 있는 기능 구현.

### TodoModify.ejs

- **수정 UI**: 기존 항목의 내용을 수정할 수 있는 입력 폼을 제공.

## 결론

- Express.js와 MongoDB를 사용하여 데이터의 CRUD(생성, 읽기, 업데이트, 삭제) 작업을 구현
- 각 작업은 클라이언트와 서버 간의 상호작용을 통해 처리
- EJS 템플릿을 사용하여 동적으로 데이터를 렌더링하고 표시
- 확장성과 유지보수성을 높이는 데 도움이 될 수 있는 구조이다.