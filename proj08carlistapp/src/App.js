import "./App.css"
import { useState } from "react"

import Input from "./Input";
import Output from "./Output";
import Jumbotron from "./Jumbotron";
import CarDetailModal from "./CarDetailModal"
import CarModifyModal from "./CarModifyModal";

const App = () => {
    let cars = [
        {
            _id: 1,
            name: "Mini Cooper",
            price: 2500,
            company: "MINI",
            year: 2022,
        },
        {
            _id: 2,
            name: "528i",
            price: 3400,
            company: "BMW",
            year: 2020,
        }
    ]

    const [carList, setCarList] = useState(cars)
    const [modalData, setModalData] = useState(cars[0])

    const appendCarData = (newCar) => {
        setCarList(prevCarList => [...prevCarList, newCar]);
    };

    const modifyCarData = (updatedCar) => {
        setCarList((prevCarList) => {
            const updatedCarIndex = prevCarList.findIndex(e => e._id === updatedCar._id);
            const newCarList = [...prevCarList];
            if (updatedCarIndex !== -1) {
                newCarList[updatedCarIndex] = updatedCar;
            }
            // 새로운 리스트 반환
            return newCarList;
        });
    };

    const deleteCarData = (_id) => {
        setCarList((prevCarList) =>
            prevCarList.filter(e => e._id !== _id))
    }

    return (<div className="App">
        <Jumbotron />
        <Input appendCarData={appendCarData} carList={carList} />
        <hr className="m-4" />
        <Output carList={carList} setModalData={setModalData} deleteCarData={deleteCarData} />
        <CarDetailModal modalData={modalData} />
        <CarModifyModal modalData={modalData} modifyCarData={modifyCarData} />
    </div>)
}

export default App;