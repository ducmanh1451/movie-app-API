const Customer = require("./../models/customer");
const mongoose = require("mongoose");

module.exports = {
  // register customer
  async registerCustomer(customer) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Customer.create(customer);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // find booking by id
  async checkDuplicateEmailCustomer(email) {
    return await Customer.findOne({ email: email, delete_date: null });
  },
};
