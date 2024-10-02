import { useEffect, useState } from "react";

const App = () => {
    const [inputValues, setInputValues] = useState({ name: "", price: 0, company: "", year: 0 });
    const [data, setData] = useState([])
    // const inputElement = useRef();

    // const focusInput = () => { inputElement.current.focus() }
    const url = "http://localhost:3001/products";

    useEffect(() => {
        // focusInput();

        console.log("loaded")

        fetch(url)
            .then(response => response.json())
            .then(setData(data))
            .catch(error => console.log(error));
    }, []);

    return (<div className="App">
        <h1>Car List</h1>
        <div>
            <input className="inputs" type="text" onKeyDown={e => setInputValues({ ...inputValues, name: e.target.value.trim() })} />
            <input className="inputs" type="number" onKeyDown={e => setInputValues({ ...inputValues, price: e.target.value.trim() })} />
            <input className="inputs" type="text" onKeyDown={e => setInputValues({ ...inputValues, company: e.target.value.trim() })} />
            <input className="inputs" type="number" onKeyDown={e => setInputValues({ ...inputValues, year: e.target.value.trim() })} />
        </div>
        <button onClick={() => {
            const { name, price, company, year } = inputValues;
            if (!name || !price || !company || !year) alert("모든 항목을 입력해주세요.")
            else {
                console.log(inputValues);

                fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(inputValues)
                })
                    .then(res => res.json())
                    .then(data => setData(data))
            }
            // setInputVal("");
            // focusInput();
        }}>등록</button>
        <hr />
        <ul>{data.map((item, i) => <li key={i}>{JSON.stringify(item)}</li>)}
        </ul>
    </div>)
}
export default App;