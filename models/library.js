const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  lib_cd: {
    type: Number,
  },
  lib_nm: {
    type: String,
  },
  lib_details: {
    type: Array,
  },
});

const Library = mongoose.model("libraries", librarySchema);

module.exports = Library;
