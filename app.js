const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/AppError");
const cors = require("cors");
const path = require("path");
const adminApp = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

adminApp.use(express.static(path.join(__dirname, "public/dist")));



const userRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes");
const resultRouter = require("./routes/resultRoutes");
const admissionRouter = require("./routes/admissionRoutes");
const academicClassRouter = require("./routes/academicClassRoutes");
const academicSessionRouter = require("./routes/academicSessionRoutes");
const termRouter = require("./routes/termRoutes");
const viewRouter = require("./routes/viewRoutes");

app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/results", resultRouter);
app.use("/api/v1/admissions", admissionRouter);
app.use("/api/v1/academic-classes", academicClassRouter);
app.use("/api/v1/academic-sessions", academicSessionRouter);
app.use("/api/v1/terms", termRouter);


app.use(('/admin', adminApp))

app.get(["/admin", "/admin/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "/public/dist", "index.html"));
});


app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
