import { useState, useEffect } from "react"

const CarModifyModal = ({ modalData, modifyCarData }) => {
    const [updatedCar, setUpdatedCar] = useState(modalData)

    useEffect(() => {
        setUpdatedCar(modalData);
    }, [modalData]);

    const renderTable = () => {
        return (<div className="container">
            <input type="text" className="form-control my-2" id="inputName" placeholder="차　종" value={updatedCar.name} onChange={e => setUpdatedCar({ ...updatedCar, name: e.target.value })} />
            <input type="number" className="form-control my-2" id="inputPrice" placeholder="가　격" value={updatedCar.price} onChange={e => setUpdatedCar({ ...updatedCar, price: e.target.value })} />
            <input type="text" className="form-control my-2" id="inputCompany" placeholder="제조사" value={updatedCar.company} onChange={e => setUpdatedCar({ ...updatedCar, company: e.target.value })} />
            <input type="number" className="form-control my-2" id="inputYear" placeholder="연　식" value={updatedCar.year} onChange={e => setUpdatedCar({ ...updatedCar, year: e.target.value })} />
            <button className="btn btn-outline-primary btn-block" type="button" data-dismiss="modal" onClick={() => {
                modifyCarData(updatedCar);
            }
            }>저장</button>
        </div>)
    }

    return (<div className="modal" id="modifyModal">
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">상세 정보</h4>
                    <button type="button" className="close">&times;</button>
                </div>

                <div className="modal-body">
                    {renderTable(modalData)}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>)
}

export default CarModifyModal