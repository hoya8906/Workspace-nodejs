import { Link } from "react-router-dom";

const Main = props =>
(<>
    <nav>
        <Link to="/">Home | </Link>
        <Link to="/products">Item | </Link>
        <Link to="/users">User | </Link>
        <Link to="/orders">Order</Link>
    </nav>
</>)

export default Main;