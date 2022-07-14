const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/authRoutes");
const productsRouter = require("./routes/api/productsRoutes");
const diaryRouter = require("./routes/api/diaryRoutes");
const swaggerRouter = require("./routes/api/swaggerRoutes");
const { createError } = require("./helpers/errors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/", swaggerRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/diary", diaryRouter);

app.use((_req, _res) => {
  throw createError(404, "Not found")
});

app.use((err, _req, _res, _next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  throw createError(status, message)
});

module.exports = app;
