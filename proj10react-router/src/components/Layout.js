import { Outlet } from "react-router-dom";
import Main from "./Main";

const Layout = props =>
(<>
    <h1>Layout Page</h1>
    <Main />
    <Outlet />

</>)

export default Layout;