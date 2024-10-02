const ProductDAO = require("../models/productModel");

// 한 페이지에 여러 모듈 등록 가능
module.exports.getAllProducts = (req, res) => {
    const productList = ProductDAO.findAll();
    try { res.status(200).json(productList); }
    catch (err) { res.status(500).json({ "message": "getAllProducts 오류" }) }
};

module.exports.getProductById = (req, res) => {
    const id = req.params.id;
    const product = ProductDAO.findById(id);
    try { res.status(200).json(product); }
    catch (err) { res.status(500).json({ "message": "getProductById 오류" }) }
};

module.exports.addNewProduct = (req, res) => {
    const id = ProductDAO.seqId++;
    const data = req.body;
    const newProduct = {
        id: id,
        name: data.name,
        price: data.price,
        company: data.company,
        year: data.year,
    }
    const product = ProductDAO.create(newProduct);
    try { res.status(200).json(product); }
    catch (err) { res.status(500).json({ "message": "addNewProduct 오류" }) }
};

module.exports.modifyProduct = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updateProduct = {
        name: data.name,
        price: data.price,
        company: data.company,
        year: data.year,
    }
    const product = ProductDAO.update(id, updateProduct);
    try { res.status(200).json(product); }
    catch (err) { res.status(500).json({ "message": "modifyProduct 오류" }) }
};

module.exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    const product = ProductDAO.delete(id);
    try { res.status(200).json(product); }
    catch (err) { res.status(500).json({ "message": "deleteProduct 오류" }) }
};