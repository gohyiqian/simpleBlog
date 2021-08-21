const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();

const homepageController = require("./controllers/homepageController");
const postsController = require("./controllers/postsController");
const testingController = require("./controllers/testingController");
const userController = require("./controllers/userController");

// set up database connection
const mongoURI = process.env.MONGO_URI;
const dbConnection = mongoose.connection;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

dbConnection.on("connected", () => console.log("My database is connected"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () =>
  console.log("My database is disconnected")
);

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// POST http://localhost:3000/posts/1?_method=PUT -> PUT http://localhost:3000/posts/1
// POST http://localhost:3000/posts/1?_method=DELETE -> DELETE http://localhost:3000/posts/1
// this middleware is used to enable HTML forms to submit PUT/DELETE requests
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

app.use(homepageController);
app.use("/users", userController);
app.use("/posts", postsController);
app.use("/testing", testingController);

app.use("*", (req, res) => {
  res.status(404);
  res.send("Page is not foundddd");
});

const server = app.listen(process.env.PORT);

process.on("SIGTERM", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});
