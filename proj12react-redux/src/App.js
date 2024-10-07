import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./inc/Layout";
import Home from "./components/Home";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import DraggableComponent from "./components/DraggableComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
    return (
        <Provider store={store}> {/* Provider로 앱 전체 감싸기 */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="counter" element={<Counter />} />
                        <Route path="todo" element={<TodoList />} />
                        <Route 
                            path="dnd" 
                            element={
                                <DndProvider backend={HTML5Backend}>
                                    <DraggableComponent />
                                </DndProvider>
                            } 
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;