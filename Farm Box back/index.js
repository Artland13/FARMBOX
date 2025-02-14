const express = require("express");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product.routes");
const feedback_on_productRouter = require("./routes/feedback_on_product.routes");
const question_on_productRouter = require("./routes/question_on_product.routes");
const answer = require("./routes/answer.routes");
const user = require("./routes/users.routes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const CLIENT_URL= process.env.CLIENT_URL|| "http://localhost:5174"

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    return res.sendStatus(200);
  }

  next();
});


const verifyToken = (req, res, next) => {
  const token = req.cookies.AccessToken;
  if (!token) {
    console.log("Токен не предоставлен");
    return res.status(403);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("Токен истек");
      return res.status(401);
    }
    console.log("Неверный токен");
    return res.status(401);
  }
};

app.use(express.json());
app.use(cookieParser());
app.use(
  "/api",
  //verifyToken, как-то надо засесть за проверку jwt
  productRouter,
  feedback_on_productRouter,
  question_on_productRouter,
  answer
);

app.use("/api", user);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
