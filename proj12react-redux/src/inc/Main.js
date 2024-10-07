import { Link } from "react-router-dom"

const Main = (props) =>

(<>
    <nav>
        <Link to="/">Home | </Link>
        <Link to="/counter">Counter | </Link>
        <Link to="/todo">TodoList | </Link>
        <Link to="/dnd">DnD</Link>
    </nav>
</>)

export default Main;