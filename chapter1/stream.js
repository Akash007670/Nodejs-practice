const fs = require("fs");

//here is adavanced way to  read large file system.

const readStream = fs.createReadStream("./files/lorem.txt", {
  encoding: "utf8",
});

const writeStream = fs.createWriteStream("./files/new-lorem.txt");

// 1. way to read and write the data

// readStream.on("data", (dataChunk) => {
//   writeStream.write(dataChunk);
// });

// 2.

readStream.pipe(writeStream);
