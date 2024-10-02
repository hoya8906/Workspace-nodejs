const carList = [
    { id: 1, name: "6 Series Gran Turismo", price: 5500, company: "BMW", year: 2022 },
    { id: 2, name: "GV70", price: 3600, company: "GENESIS", year: 2020 },
];

// class ProductDao { }
// module.exports = new ProductDao();

// 어차피 한 번만 사용하는 객체라면 객체 리터럴 사용

const ProductDAO = {
    seqId: carList.length + 1,

    findAll: () => {
        return [...carList];
    },
    findById: (id) => {
        const idx = carList.findIndex((car) => car.id == id);
        if (idx !== -1) return [carList[idx]];
    },
    create: (dto) => {
        carList.push(dto);
        return [...carList];
    },
    update: (id, dto) => {
        const idx = carList.findIndex((car) => car.id == id);
        if (idx !== -1) carList[idx] = dto;
        return [...carList];
    },
    delete: (id) => {
        const idx = carList.findIndex((car) => car.id == id);
        if (idx !== -1) carList.splice(idx, 1);
        return [...carList];
    },
};

module.exports = ProductDAO;