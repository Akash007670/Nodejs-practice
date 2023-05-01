const express = require("express");
const router = express.Router();
const path = require("path");

//Accessing index.html page
router.get("^/$|/index.html", (req, res) => {
  // ^ means begin with, and $ means ends with and, | means or
  //Both Line down below does the same thing.
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

//Accessing index.html where .html extension would not be there
router.get("^/$|/index(.html)?", (req, res) => {
  //Here .html is in the parentheses and put ? after that it will make .html optional
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

//How to redirect to different page if don't want user to access a particular page.
//Here user is accessing old page but im redirecting it to new page.
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 status by default therefore status 301 needs to be defined.
});

module.exports = router;
