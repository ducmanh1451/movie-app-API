let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.BOOKINGS_SERVICE_URL, {
      dbName: "bookings_db", // Tên của database
    });
    console.log("Connect database bookings_db successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;