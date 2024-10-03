import { useEffect, useState } from "react";
import axios from "axios";
import CarForm from "./CarForm";
import CarList from "./CarList";

const App = () => {
    const [inputValues, setInputValues] = useState({ name: "", price: 0, company: "", year: 0 });
    const [editingItem, setEditingItem] = useState({ id: 0, name: "", price: 0, company: "", year: 0 });
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(null);

    const url = "http://localhost:3001/products";

    useEffect(() => {
        axios.get(url)
            .then(res => setData(res.data))
            .catch(console.error);
    }, []);

    const handleEdit = (item) => {
        setEditMode(item.id);
        setEditingItem({ id: item.id, ...item });
    };

    const handleUpdate = (id) => {
        const updateUrl = `${url}/${id}`;
        axios.put(updateUrl, editingItem)
            .then(res => {
                setData(res.data);
                setEditMode(null);
            })
            .catch(error => {
                console.error("수정 실패:", error);
            });
    };

    const handleDelete = (id) => {
        const delUrl = `${url}/${id}`;
        axios.delete(delUrl)
            .then(res => setData(res.data))
            .catch(error => {
                console.error("삭제 실패:", error);
            });
    };

    const handleSubmit = () => {
        const { name, price, company, year } = inputValues;
        if (!name || !price || !company || !year) alert("모든 항목을 입력해주세요.");
        else {
            axios.post(url, inputValues)
                .then(res => setData(res.data));
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
