# 10/02

이 프로젝트는 **차량 목록 관리 시스템**으로, **React**와 **Express**를 활용하여 차량 정보를 CRUD(Create, Read, Update, Delete)할 수 있도록 구현된 간단한 웹 애플리케이션이다. 이 애플리케이션의 서버는 Express 기반이고, 클라이언트는 React로 만들어져 있으며, 차량 데이터는 상태(State)로 관리된다.

## 1. 서버 구조 및 동작 (server.js, product.js)

### server.js

```jsx
const http = require("http");
const express = require("express");
const mainApp = express();

const productsApp = require("./apps/products");

mainApp.use("/products", productsApp); // "/products" 경로로 들어오는 요청은 productsApp에서 처리

const server = http.createServer(mainApp);
server.listen(3001, () => {
    console.log("server run...");
});
```

- **HTTP 서버 생성**: `http.createServer`를 통해 Express 애플리케이션을 HTTP 서버로 설정하고, 3001번 포트에서 서버가 실행되도록 설정함.
- **라우팅 설정**: `/products` 경로로 들어오는 요청은 `productsApp`에서 처리하도록 설정.

### product.js

```jsx
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.use(cors({
    origin: "*", // 모든 도메인에서의 요청을 허용
}));
app.use(express.json()); // JSON 형식의 요청 바디를 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 바디를 파싱

const productList = []; // 차량 목록을 저장하는 배열
let cnt = 1; // 차량 ID를 생성하는 카운터

// 모든 차량 정보 조회 (GET 요청)
router.get("/", (req, res) => {
    res.send(productList);
});

// 새로운 차량 추가 (POST 요청)
router.post("/", (req, res) => {
    const { name, price, company, year } = req.body;
    if (!name || !price || !company || !year) {
        console.log("모든 항목이 입력되어야 합니다.");
    } else {
        productList.push({ id: cnt++, name, price, company, year });
    }
    res.send(productList); // 추가 후 최신 목록 반환
});

// 차량 정보 수정 (PUT 요청)
router.put("/:id", (req, res) => {
    const idx = productList.findIndex(product => product.id === parseInt(req.params.id));
    if (idx !== -1) {
        const { name, price, company, year } = req.body;
        productList[idx] = { ...productList[idx], name, price, company, year };
    }
    res.send(productList); // 수정 후 최신 목록 반환
});

// 차량 삭제 (DELETE 요청)
router.delete("/:id", (req, res) => {
    const idx = productList.findIndex(product => product.id === parseInt(req.params.id));
    if (idx !== -1) {
        productList.splice(idx, 1); // 배열에서 해당 인덱스를 삭제
    }
    res.send(productList); // 삭제 후 최신 목록 반환
});

app.use("/", router);

module.exports = app;
```

- **CRUD 처리**: 각 요청(GET, POST, PUT, DELETE)에 따라 차량 목록을 조회, 추가, 수정, 삭제하는 기능을 구현. 서버는 차량 데이터를 관리하며, 각 요청 후에는 최신 목록을 클라이언트에 반환한다.
- **CORS 처리**: 다른 도메인에서도 서버에 요청을 보낼 수 있도록 허용.
- **데이터 저장**: 메모리에 `productList` 배열로 저장되어 있으므로 서버가 재시작되면 데이터는 초기화됨.

---

## 2. 클라이언트 구조 및 동작 (App.js, CarForm.js, CarList.js)

### App.js

```jsx
import { useEffect, useState } from "react";
import axios from "axios";
import CarForm from "./CarForm";
import CarList from "./CarList";

const App = () => {
    const [inputValues, setInputValues] = useState({ name: "", price: 0, company: "", year: 0 });
    const [editingItem, setEditingItem] = useState({ id: 0, name: "", price: 0, company: "", year: 0 });
    const [data, setData] = useState([]); // 차량 목록 상태
    const [editMode, setEditMode] = useState(null); // 현재 수정 모드인 차량 ID

    const url = "<http://localhost:3001/products>"; // 서버 URL

    // 서버에서 차량 목록을 가져오는 함수 (GET 요청)
    useEffect(() => {
        axios.get(url)
            .then(res => setData(res.data))
            .catch(console.error);
    }, []);

    // 차량 수정 버튼 클릭 시 실행
    const handleEdit = (item) => {
        setEditMode(item.id);
        setEditingItem({ id: item.id, ...item });
    };

    // 차량 수정 완료 시 서버에 PUT 요청
    const handleUpdate = (id) => {
        axios.put(`${url}/${id}`, editingItem)
            .then(res => {
                setData(res.data); // 수정 후 데이터 갱신
                setEditMode(null); // 수정 모드 종료
            })
            .catch(console.error);
    };

    // 차량 삭제 시 서버에 DELETE 요청
    const handleDelete = (id) => {
        axios.delete(`${url}/${id}`)
            .then(res => setData(res.data)) // 삭제 후 데이터 갱신
            .catch(console.error);
    };

    // 새로운 차량 등록 (POST 요청)
    const handleSubmit = () => {
        if (!inputValues.name || !inputValues.price || !inputValues.company || !inputValues.year) {
            alert("모든 항목을 입력해주세요.");
        } else {
            axios.post(url, inputValues)
                .then(res => setData(res.data)); // 등록 후 데이터 갱신
        }
    };

    return (
        <div className="container">
            <h1 className="my-4 text-center">Car List</h1>
            <CarForm
                inputValues={inputValues}
                setInputValues={setInputValues}
                handleSubmit={handleSubmit}
            />
            <hr />
            <CarList
                data={data}
                editMode={editMode}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;
```

- **`useEffect`**: 서버에서 차량 목록을 불러오는 역할을 하며, 컴포넌트가 처음 렌더링될 때 한 번만 실행된다.
- **CRUD 작업**:
    - `handleSubmit`: 새로운 차량 정보를 입력 후 서버에 POST 요청을 보내고, 차량 목록을 갱신.
    - `handleEdit`: 수정 모드로 전환하여 수정할 항목을 `editingItem` 상태에 저장.
    - `handleUpdate`: 수정 완료 후 PUT 요청을 보내고, 차량 목록을 갱신.
    - `handleDelete`: DELETE 요청을 보내고 차량 목록을 갱신.

---

### CarForm.js

```jsx
const CarForm = ({ inputValues, setInputValues, handleSubmit }) => {
    return (
        <div className="row mb-4">
            <div class="input-group input-group-sm">
                <input className="form-control" type="text" placeholder="차종"
                    onChange={e => setInputValues({ ...inputValues, name: e.target.value.trim() })} />

                <input className="form-control" type="number" placeholder="가격"
                    onChange={e => setInputValues({ ...inputValues, price: e.target.value.trim() })} />

                <input className="form-control" type="text" placeholder="회사"
                    onChange={e => setInputValues({ ...inputValues, company: e.target.value.trim() })} />

                <input className="form-control" type="number" placeholder="연식"
                    onChange={e => setInputValues({ ...inputValues, year: e.target.value.trim() })} />

                <button id="attBtn" className="btn btn-sm btn-success"
                    onClick={handleSubmit}>등록</button>
            </div>
        </div>
    );
}
```

- **입력 폼**: 새로운 차량을 등록할 때 사용하는 입력 폼으로, 입력값을 `inputValues` 상태로 관리하며, 입력 값이 변경될 때마다 상태가 업데이트된다.
- **등록 버튼**: 버튼을 클릭하면 `handleSubmit` 함수가 호출되어 새로운 차량 정보를 서버에 전송.

---

### CarList.js

```jsx
const CarList = ({ data, editMode, editingItem, setEditingItem, handleEdit, handleUpdate, handleDelete }) => {
    return (
        <table className="table table-light table-striped-columns table-hover">
            <thead>
                <tr>
                    <th>차종</th>
                    <th>가격</th>
                    <th>회사</th>
                    <th>연식</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>

                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="text"
                                    value={editingItem.name}
                                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="number"
                                    value={editingItem.price}
                                    onChange={e => setEditingItem({ ...editingItem, price: e.target.value })} />
                            ) : (
                                item.price
                            )}
                        </td>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="text"
                                    value={editingItem.company}
                                    onChange={e => setEditingItem({ ...editingItem, company: e.target.value })} />
                            ) : (
                                item.company
                            )}
                        </td>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="number"
                                    value={editingItem.year}
                                    onChange={e => setEditingItem({ ...editingItem, year: e.target.value })} />
                            ) : (
                                item.year
                            )}
                        </td>
                        <td>
                            <div class="btn-group">
                                {editMode === item.id ? (
                                    <button className="btn btn-sm btn-primary" onClick={() => handleUpdate(item.id)}>저장</button>
                                ) : (
                                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>수정</button>
                                )}
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>삭제</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
```

- **차량 리스트 출력**: 서버로부터 받은 데이터를 출력하며, 각 차량 정보는 수정 가능 여부에 따라 입력 필드 또는 일반 텍스트로 표시된다.
- **수정 버튼**: 차량 정보를 수정할 때, `handleEdit`을 호출하여 해당 차량의 수정 모드를 활성화.
- **저장 버튼**: 수정 완료 후 `handleUpdate`를 호출하여 수정된 정보를 서버로 전송.
- **삭제 버튼**: 해당 차량을 삭제할 때 `handleDelete`를 호출하여 서버로 DELETE 요청을 보냄.

---

### 결론

이 프로젝트는 React를 사용하여 차량 목록을 관리하고, Axios를 통해 서버와 통신하여 데이터를 CRUD 작업을 처리한다. 서버는 Express로 구현되어 있으며, 간단한 API를 통해 데이터를 관리하고 클라이언트에 전달하는 구조로 이루어져 있다.