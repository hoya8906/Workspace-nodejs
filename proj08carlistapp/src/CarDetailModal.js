const CarDetailModal = ({ modalData }) => {

    const renderTable = (modalData) => {
        const { _id, name, price, company, year } = modalData

        return (<table className="table">
            <thead>
                <tr>
                    <th>ID</th><th>차종</th><th>가격</th><th>회사</th><th>년식</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{_id}</td><td>{name}</td><td>{price}</td><td>{company}</td><td>{year}</td>
                </tr>
            </tbody>
        </table>)
    }

    return (<div className="modal" id="detailModal">
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">상세 정보</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
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

export default CarDetailModal