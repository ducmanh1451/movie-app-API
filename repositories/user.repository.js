const Customer = require("./../models/customer");
const mongoose = require("mongoose");

module.exports = {
  // find customer by id
  async findCustomer(customerId) {
    return Customer.find({ _id: customerId, delete_date: null }).select(
      "-create_date -update_date -delete_date -__v"
    );
  },

  // update customer
  async updateCustomer(_id, customer) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Customer.findByIdAndUpdate(
        _id,
        { $set: customer },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // update history customer
  async updateHistoryCustomer(_id, data) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Customer.findByIdAndUpdate(
        _id,
        { $push: { booking_history: data } },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
