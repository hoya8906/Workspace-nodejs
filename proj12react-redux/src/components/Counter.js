import { useDispatch, useSelector } from "react-redux";
import { increament, decreament } from "../redux/store";

const Counter = () => {

    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    return (<>
        <h3>Counter Page</h3>
        <h1>Count: {count}</h1>
        <button onClick={e => dispatch(increament())}>증가</button >
        <button onClick={e => dispatch(decreament())}>감소</button >
    </>)

}
export default Counter;