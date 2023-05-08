const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const app = express();
const PORT = 3300;

//creating our own middlware
//app.use takes annoymous function which takes 3 parameters req, res, and next.
//next is already there in built in middlewares that's why we need in custom middleware.
app.use(logger);

//Using cors:- Cross Origin Resource Sharing

// creating whitelist where only given domain can access it.
app.use(cors(corsOptions));

//Built in middleware to handle urlencoded data
//In other words form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//Built in middleware for json
app.use(express.json());

//Built in middleware to server static files
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/register"));
app.use("/employees", require("./routes/api/employees"));

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
