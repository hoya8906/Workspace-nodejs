import { useState } from "react";
import Input from "./Input";
import Output from "./Output";

const App = () => {
    // 변수의 값을 수정해도 컴포넌트는 새로 그려지지 않는다.
    // 컴포넌트가 새로 그려지려면 state 값을 변경해야 한다.(리-렌더링)
    //let message = "Hello world!!!"
    // useState() 훅을 이용해서 state 생성
    const [message, setMessage] = useState("Hello world!!!");
    const [greeting, setGreeting] = useState("안녕하시오?");

    const btnEventHandler = () => {
        // message = "봉 주르"
        // 상수는 직접 수정 불가능, setter로 바꾸어야 한다.
        setMessage("봉 주르"); // state 변경 후 모든 컴포넌트 갱신
        setGreeting("안녕하시오?");

        console.log("버튼 클릭했다!", message)
    }

    return (<>
        <h1>Hello react world!!!</h1>
        {/* button은 Input.js로 모듈 분리 */}
        <Input handler={btnEventHandler} greeting={message} />
        {/* h3은 Output.js로 모듈 분리 */}
        <Output greeting={greeting} />
    </>)
};

// 모듈에 등록 (사용하는 곳에서 import)
export default App;