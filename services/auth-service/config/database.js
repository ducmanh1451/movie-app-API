let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.AUTH_SERVICE_URL, {
      dbName: "auth_db", // Tên của database
    });
    console.log("Connect database auth_db successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
