const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = 3300;

//creating our own middlware
//app.use takes annoymous function which takes 3 parameters req, res, and next.
//next is already there in built in middlewares that's why we need in custom middleware.
app.use(logger);

//Using cors:- Cross Origin Resource Sharing

// creating whitelist where only given domain can access it.
const whiteList = ["http://localhost:3300/"];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true); //null is usually the error and true and supposed to allowed to pass to cors from the given whitelist
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));

//Built in middleware to handle urlencoded data
//In other words form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//Built in middleware for json
app.use(express.json());

//Built in middleware to server static files
app.use(express.static(path.join(__dirname, "/public")));

//Accessing index.html page
app.get("^/$|/index.html", (req, res) => {
  // ^ means begin with, and $ means ends with and, | means or
  //Both Line down below does the same thing.
  res.sendFile("./views/index.html", { root: __dirname });
  //   res.sendFile(path.join(__dirname, "views", "index.html"));
});

//Accessing index.html where .html extension would not be there
app.get("^/$|/index(.html)?", (req, res) => {
  //Here .html is in the parentheses and put ? after that it will make .html optional
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

//How to redirect to different page if don't want user to access a particular page.
//Here user is accessing old page but im redirecting it to new page.
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 status by default therefore status 301 needs to be defined.
});

//Trying to access page or route if not available will give page 404.
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found!!" });
  } else {
    res.type("txt").send("404 Not Found!!");
  }
});

//Custom Middleware for errorHandling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
