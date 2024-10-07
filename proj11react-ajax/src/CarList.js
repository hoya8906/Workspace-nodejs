import React from 'react';

const CarList = ({ data, editMode, editingItem, setEditingItem, handleEdit, handleUpdate, handleDelete }) => {
    return (
        <table className="table table-light table-striped-columns table-hover">
            <thead className="">
                <tr>
                    <th>차종</th>
                    <th>가격</th>
                    <th>회사</th>
                    <th>연식</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="text"
                                    value={editingItem.name}
                                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="number"
                                    value={editingItem.price}
                                    onChange={e => setEditingItem({ ...editingItem, price: e.target.value })} />
                            ) : (
                                item.price
                            )}
                        </td>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="text"
                                    value={editingItem.company}
                                    onChange={e => setEditingItem({ ...editingItem, company: e.target.value })} />
                            ) : (
                                item.company
                            )}
                        </td>
                        <td>
                            {editMode === item.id ? (
                                <input
                                    className="form-control form-control-sm" type="number"
                                    value={editingItem.year}
                                    onChange={e => setEditingItem({ ...editingItem, year: e.target.value })} />
                            ) : (
                                item.year
                            )}
                        </td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                {editMode === item.id ? (
                                    <button className="btn btn-sm btn-primary" onClick={() => handleUpdate(item.id)}>저장</button>
                                ) : (
                                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item)}>수정</button>
                                )}
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>삭제</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CarList;
