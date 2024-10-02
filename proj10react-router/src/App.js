import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Users from "./components/Users";

const App = () =>
(<>
    <h1>App Page</h1>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} />
            {/* <Route index element={<Home />} /> */}
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
        </Routes>
    </BrowserRouter>
    <div>
        <copyright>
            <address>서울 구구구 비둘동</address>
        </copyright>
    </div>
</>)

export default App;