const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// console.log(format(new Date(), "dd-MM-yyyy kk:mm:ss"));
// Symbol  Meaning                     Presentation      Examples
// ------  -------                     ------------      -------
//  h       clock-hour-of-am-pm (1-12)  number            12
//  K       hour-of-am-pm (0-11)        number            0
//  k       clock-hour-of-day (1-24)    number            24
//  H       hour-of-day (0-23)          number            0

//Most used are hh and HH for the hour

// console.log(uuid()); //This will generate random uuid of version v4.

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "dd-MM-yyyy \t HH:mm:ss")}`;
  const logItem = `${dateTime} \t ${uuid()} \t ${message} \n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;
