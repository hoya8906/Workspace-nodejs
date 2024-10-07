const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const productList = [
    { id: 1, name: "X5", price: 5500, company: "BMW", year: 2022 },
    { id: 2, name: "A6", price: 3400, company: "AUDI", year: 2020 },
];
let cnt = productList.length;

router.get("/", (req, res) => {
    console.log("GET: Product List");

    // 리액트에서 Ajax 요청할 데이터(배열)를 JSON으로 보냄
    res.send(productList);
});

router.post("/", (req, res) => {
    console.log("POST: Product List");
    // POST는 파라미터를 body에서 받아옴
    // body-parser 미들웨어 설정 필요
    const { name, price, company, year } = req.body;
    if (!name || !price || !company || !year) console.log("모든 항목이 입력되어야 합니다.");
    else {
        productList.push({ id: cnt++, name, price, company, year });
        console.log("새 product 등록 완료")
    }

    // 데이터를 배열에 저장 후 새로 고침
    res.send(productList)
});

router.put("/:id", (req, res) => {
    console.log("update: Product List");
    const idx = productList.findIndex(product => product.id === parseInt(req.params.id))
    if (idx !== -1) {
        const { name, price, company, year } = req.body;
        if (!name || !price || !company || !year) console.log("모든 항목이 입력되어야 합니다.");
        else {
            productList[idx] = { ...productList[idx], name, price, company, year };
            console.log(idx, "번 product 수정 완료: ", productList[idx]);
        }
    } else console.log(`${idx}번 product 찾을 수 없음`)
    res.send(productList);
})

router.delete("/:id", (req, res) => {
    console.log("delete: Product List");
    const idx = productList.findIndex(product => product.id === parseInt(req.params.id))
    if (idx !== -1) {
        console.log(idx, "번 product 삭제 완료: ", productList[idx]);
        productList.splice(idx, 1);
    } else console.log(`${idx}번 product 찾을 수 없음`);
    res.send(productList);
})

app.use("/", router);

module.exports = app;