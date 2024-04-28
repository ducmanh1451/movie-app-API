const Library = require("./../models/library");

module.exports = {
  // get library by code
  async getLibraryByCode(lib_cd) {
    return Library.find({ lib_cd: lib_cd });
  },
};
