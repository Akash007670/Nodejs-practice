const express = require("express");
const path = require("path");
const app = express();
const PORT = 3300;

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
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
