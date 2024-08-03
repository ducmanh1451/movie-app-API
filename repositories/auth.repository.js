const Customer = require("./../models/customer");
const Staff = require("./../models/staff");
const mongoose = require("mongoose");

module.exports = {
  // get customer
  async findCustomer(id) {
    return await Customer.findOne({ _id: id, delete_date: null });
  },

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

  // find customer by email
  async findCustomerByEmail(email) {
    return await Customer.findOne({ email: email, delete_date: null });
  },

  // update refresh_token of customer after login
  async updateRefreshTokenCustomer(customer_id, token) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Customer.findByIdAndUpdate(
        customer_id,
        { refresh_token: token },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // verify customer refresh token
  async verifyCustomerRefreshToken(customer_id, refresh_token) {
    const customer = await Customer.findById(customer_id);
    if (customer && customer.refresh_token === refresh_token) {
      return customer;
    }
    return null;
  },

  // clear customer refresh token
  async clearCustomerRefreshToken(customer_id) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Customer.findByIdAndUpdate(
        customer_id,
        { refresh_token: "" },
        { new: true }
      );
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  ////////////////
  // STAFF
  ////////////////

  // find staff by user_id
  async findStaffByUserId(user_id) {
    return await Staff.findOne({ user_id: user_id, delete_date: null });
  },
};
