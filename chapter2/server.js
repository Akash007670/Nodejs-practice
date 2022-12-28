const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");

const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const PORT = process.env.PORT || 3500;

//creating a server

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  const extension = path.extname(req.url);
  let contentType;
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Initialize object

// const myEmitter = new Emitter();

// //Add listener for the log event

// myEmitter.on("log", (msg) => logEvents(msg));

// setTimeout(() => {
//   //Emit event
//   myEmitter.emit("log", "Log event emitted..");
// }, 2000);
