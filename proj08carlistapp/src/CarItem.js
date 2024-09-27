const CarItem = ({ car, setModalData, deleteCarData }) => {

    const showDetail = (car) => {
        console.log(car);
        setModalData(car);
    }

    const showModify = () => {
        console.log(car);
        setModalData(car);
    }

    const deleteCar = (car) => {
        console.log(car);
        deleteCarData(car._id);
    }

    return (<tr>
        <td>{car._id}</td>
        <td><button className="btn btn-sm" data-toggle="modal" data-target="#detailModal" onClick={() => showDetail(car)}>{car.name}</button></td>
        <td>{car.price}</td>
        {/* <td>{company}</td> */}
        <td>{car.year}</td>
        <td>
            <button className="btn btn-sm btn-outline-secondary mx-2" data-toggle="modal" data-target="#modifyModal" onClick={() => showModify()}>수정</button>
            <button className="btn btn-sm btn-outline-warning mx-2" onClick={() => deleteCar(car)} >삭제</button>
        </td>
    </tr >)
}

export default CarItem 