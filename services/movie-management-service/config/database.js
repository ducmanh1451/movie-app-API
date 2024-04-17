let mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URL, {
      dbName: "movies_db", // Tên của database
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connect database movie successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
