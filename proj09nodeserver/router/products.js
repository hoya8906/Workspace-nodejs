const express = require("express");
const { getAllProducts, getProductById, addNewProduct, modifyProduct, deleteProduct }
    = require("../controllers/productsController");
const router = express.Router();

router.route("/products").get(getAllProducts)
    .post(addNewProduct);

router.route("/products/:id").get(getProductById)
    .post(modifyProduct)
    .delete(deleteProduct)

// 함수로 등록해서 사용할 수도 있다
// const routing = (url, method, callback) => {
//     router.route(url)[method](callback)
// };

// nodejs 모듈로 등록(app.js 에서 미들웨어로 사용)
module.exports = router;