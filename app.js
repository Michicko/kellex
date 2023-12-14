const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/AppError");
const cors = require('cors');
const path = require('path');



if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

const userRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes");
const resultRouter = require("./routes/resultRoutes");
const admissionRouter = require("./routes/admissionRoutes");
const academicClassRouter = require("./routes/academicClassRoutes");
const academicSessionRouter = require("./routes/academicSessionRoutes");
const termRouter = require("./routes/termRoutes");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/results", resultRouter);
app.use("/api/v1/admissions", admissionRouter);
app.use("/api/v1/academic-classes", academicClassRouter);
app.use("/api/v1/academic-sessions", academicSessionRouter);
app.use("/api/v1/terms", termRouter);

app.use(express.static(path.join(__dirname, "/views")));


app.get('/', (req, res, next) => {
  res.sendFile("index.html");
})

app.get('/admin', (req, res, next) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
})

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
