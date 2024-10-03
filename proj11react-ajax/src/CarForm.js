import React from 'react';

const CarForm = ({ inputValues, setInputValues, handleSubmit }) => {
    return (
        <div className="row mb-4">
            <div class="input-group input-group-sm">
                <input className="form-control" type="text" placeholder="차종"
                    onChange={e => setInputValues({ ...inputValues, name: e.target.value.trim() })} />

                <input className="form-control" type="number" placeholder="가격"
                    onChange={e => setInputValues({ ...inputValues, price: e.target.value.trim() })} />

                <input className="form-control" type="text" placeholder="회사"
                    onChange={e => setInputValues({ ...inputValues, company: e.target.value.trim() })} />

                <input className="form-control" type="number" placeholder="연식"
                    onChange={e => setInputValues({ ...inputValues, year: e.target.value.trim() })} />
                
                <button id="attBtn" className="btn btn-sm btn-success"
                    onClick={handleSubmit}>등록</button>
            </div>

        </div>

    );
}

export default CarForm;
