import { useState, useEffect } from "react";
import Output from "./Output";
import Input from "./Input";
import Button from "./Button";

const App = () => {
    const [message, setMessage] = useState("");
    const [value, setValue] = useState("");

    const printConsole = (msg) => {
        console.log(msg)
    }
    useEffect(() => {
        if (message !== "") printConsole(message);
    }, [message])

    return (<><h1>Hello World!!!</h1>
        <Output msg="반가워요" />
        <Input id="msgInput" value={value} />
        <Button name="입력" fn={() => {
            const inputVal = document.querySelector("#msgInput").value;
            // setValue(inputVal);
            setMessage(inputVal);
            document.querySelector("#outputMsg").innerHTML = inputVal;
        }} />
    </>)
}

export default App;