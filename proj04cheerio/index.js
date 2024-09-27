const http = require("http");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

app.set("PORT", 3333);

// 특정 페이지의 URL을 가져오는 예제
app.get("/axios", (req, res) => {
    const getUrlVal = "https://www.kosta.or.kr/about";
    axios.get(getUrlVal, { responseType: "arraybuffer" })
        .then((response) => {
            let htmlCMD = iconv.decode(response.data, "UTF-8").toString();
            let $ = cheerio.load(htmlCMD);

            let selectData = $("div._img_box img");
            console.log(selectData.length);
            for (i = 0; i < selectData.length; i++) {
                let imgUrl = selectData[i].attribs.src;
                let imgDataUrl = imgUrl.split("?")[0];
                axios.get(imgDataUrl, { responseType: "arraybuffer" })
                    .then((imgres) => {
                        console.log(imgres.data);
                        fs.writeFile(`./download/${cnt++}.jpg`, imgres.data, () => {
                            console.log(`이미지 다운로드 완료`);
                        })
                    })
                // console.log(imgUrl);
            }
        })
    res.end("/axios")
})


const server = http.createServer(app);
server.listen(app.get("PORT"), () => {
    console.log(`Run on Server >>> http://localhost:${app.get("PORT")}`);
});