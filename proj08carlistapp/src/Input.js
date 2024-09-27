import { useState } from "react"

const Input = ({ appendCarData, carList }) => {

    const [newCar, setNewCar] = useState({ _id: 0, name: "", price: "", company: "", year: "" })

    const handleSubmit = () => {
        // 최신 상태의 prevCarList를 사용하여 최대 no 값을 계산
        const maxNo = carList.reduce((max, car) => parseInt(car._id) > max ? parseInt(car._id) : max, 0);
        newCar._id = maxNo + 1;
        appendCarData(newCar);  // 새로운 차량 추가
        setNewCar({ _id: 0, name: "", price: "", company: "", year: "" });  // 등록 후 입력 필드를 초기화
    };

    return (
        <div className="container">
            <div className="input-group mb-3">
                <input type="text" className="form-control col-4" id="inputName" placeholder="차　종" value={newCar.name} onChange={e => setNewCar({ ...newCar, name: e.target.value })} />
                <input type="number" className="form-control col-2" id="inputPrice" placeholder="가　격" value={newCar.price} onChange={e => setNewCar({ ...newCar, price: e.target.value })} />
                <input type="text" className="form-control col-3" id="inputCompany" placeholder="제조사" value={newCar.company} onChange={e => setNewCar({ ...newCar, company: e.target.value })} />
                <input type="number" className="form-control col-2" id="inputYear" placeholder="연　식" value={newCar.year} onChange={e => setNewCar({ ...newCar, year: e.target.value })} />
                <button className="btn btn-outline-primary btn-block col-1" type="button" data-dismiss="modal" onClick={() => handleSubmit()}>등록</button>
            </div>
        </div>)
}

export default Input