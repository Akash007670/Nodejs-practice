// const os = require("os");
const path = require("path");
// const math = require("./math");
// const { add, sub, mul, div } = require("./math"); //destructured here

// const fs = require("fs");
const fsPromises = require("fs").promises; //This way we can use promises in file system fs.

// console.log(os.type()); // ---> Windows_NT
// console.log(os.userInfo()); // ---> {
//     uid: -1,
//     gid: -1,
//     username: 'Akash',
//     homedir: 'C:\\Users\\Akash',
//     shell: null
//
// }

// console.log(os.version()); // ---> Windows 10 Home Single Language
// console.log(os.homedir()); // ---> C:\Users\Akash
// console.log(os.hostname()); // ----> Akash
// console.log(os.platform()); // ----> win32

// console.log(__dirname); // ---> directory name D:\dave-gray-nodejs
// console.log(__filename); // ----> file name D:\dave-gray-nodejs\index.js

// console.log(path.dirname(__filename)); // ---> directory name file name D:\dave-gray-nodejs\index.js
// console.log(path.basename(__filename)); // ---> index.js
// console.log(path.extname(__filename)); // ---> .js

// console.log(path.parse(__filename)); // ---> {
//     root: 'D:\\',
//     dir: 'D:\\dave-gray-nodejs',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
//   }

// console.log(math.add(1, 2)); // 3
// console.log(math.sub(100, 50)); // 50
// console.log(math.mul(10, 5)); // 50
// console.log(math.div(100, 4)); // 25

// console.log(add(1, 2)); // 3
// console.log(sub(100, 50)); // 50
// console.log(mul(10, 5)); // 50
// console.log(div(100, 4)); // 25

//File system starts here

// 1. readFile

// fs.readFile("./files/starter.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data); // This will give buffer value like this --> <Buffer 48 65 79 20 74 68 65 72 65 2c 20 4d 79 20 6e 61 6d 65 20 69 73 20 41 6b 61 73 68 20 4b 75 6d 61 72 2e>
//   //That's why we need to change this into readable form using toString() method.
//   console.log(data.toString()); // --> Hey there, My name is Akash Kumar.
// });

//Now there is another way where we don't need to use toString method which is pass the utf before callback
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data); // --> Hey there, My name is Akash Kumar.
//   }
// );

// process.on("uncaughtException", (err) => {
//   console.error(err);
//   process.exit(1);
// });

// 2. writeFile

//This looks like callback hell because we are wrapping next function in callbacks.

// fs.writeFile(
//   path.join(__dirname, "files", "newWriteFile.txt"),
//   "The content which i need to add goes here. and we do not need utf8 in next comma",
//   (err) => {
//     if (err) throw err;
//     console.log("my write file is completed");
//     //Appending the data
//     fs.appendFile(
//       path.join(__dirname, "files", "newWriteFile.txt"),
//       "\n\n Hello, I'm trying to append the data into the file.",
//       (err) => {
//         if (err) throw err;
//         console.log("Append completed");
//         //Renaming the file
//         fs.rename(
//           path.join(__dirname, "files", "newWriteFile.txt"),
//           path.join(__dirname, "files", "renamedFile.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("I got renamed");
//           }
//         );
//       }
//     );
//   }
// );

//Now to get rid of callback hell we will use async await

const fileOperation = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\n Hello there i got appended"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "newPromiseRenamed.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "newPromiseRenamed.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};
fileOperation();
