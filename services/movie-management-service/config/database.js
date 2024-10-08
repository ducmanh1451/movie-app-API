let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MOVIES_SERVICE_URL, {
      dbName: "movies_db", // Tên của database
    });
    console.log("Connect database movies_db successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
