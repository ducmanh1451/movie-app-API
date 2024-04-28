let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.HELPERS_SERVICE_URL, {
      dbName: "libraries_db", // Tên của database
    });
    console.log("Connect database libraries_db successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
