import CarItem from "./CarItem"

const Output = ({ carList, setModalData, deleteCarData }) => {

    const makeRow = () => {
        return (
            carList.map(car =>
                <CarItem key={car._id} car={car} setModalData={setModalData} deleteCarData={deleteCarData} />)
        );
    }

    return (
        <div className="container">
            <h2>Best Used Car.</h2>
            <p>최고의 차량 전문가들이 50가지의 점검 항목에 대해 점검을 완료했습니다.</p>
            <table className="table table-bordered table-md">
                <thead>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-4">Name</th>
                        <th className="col-2">Price</th>
                        {/* <th>Company</th> */}
                        <th className="col-2">Year</th>
                        <th className="col-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {makeRow()}
                </tbody>
            </table>
        </div>)
}

export default Output