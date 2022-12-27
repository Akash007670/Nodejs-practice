const fs = require("fs");

//1. Creating a directory && checking while the diretory is already there or not.

if (!fs.existsSync("./new")) {
  // The existsSync checks whether the directory is already present or not. If it is not present then create the new directory.
  fs.mkdir("./new", (err) => {
    //Here mkdir is make directory
    if (err) throw err;
    console.log("Directory Created..");
  });
}

//2. Deleting a directory

if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory Deleted..");
  });
}
