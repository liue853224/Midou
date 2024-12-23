// 加入環境變數
require("dotenv").config();

// 載入express、設置port、設置body parser
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
//確認數據庫連接狀況
const { sequelize } = require("./models");

//引用upload靜態資料
app.use("/upload", express.static(path.join(__dirname, "upload")));

sequelize
  .authenticate()
  .then(() => {
    console.log("數據庫連接中...");
  })
  .catch((err) => {
    console.error("數據連接發生了一些問題:", err);
  });

//引入passport
const passport = require("./config/passport");

// 使用 body-parser 中間件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 使用passport
app.use(passport.initialize());

// 引入API路由
const apiRoutes = require("./routes");

// 使用API路由
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
