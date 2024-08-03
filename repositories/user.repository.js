const Customer = require("./../models/customer");
const Staff = require("./../models/staff");
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

  ////////////////
  // STAFF
  ////////////////

  // get all staffs
  async getAllStaffs() {
    return Staff.find({ delete_date: null });
  },
  // get staffs by authority
  async getStaffsByAuthority(authority, belong_cinema) {
    return Staff.find({ delete_date: null, authority: authority, belong_cinema: belong_cinema });
  },
  async findStaffByUserId(userId) {
    return Staff.find({ delete_date: null, user_id: userId });
  },

  // create staff
  async addNewStaff(staff) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user_id = await this.createNewUserId();
      return await Staff.create({ user_id: user_id, ...staff });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // create new user_id for staff
  async createNewUserId() {
    const lastStaff = await Staff.findOne({ authority: { $ne: 1 } })
      .sort({ user_id: -1 })
      .exec();
    let newUserId;
    if (lastStaff) {
      const lastUserId = lastStaff.user_id;
      const lastNumber = parseInt(lastUserId.split("_")[1], 10);
      newUserId = `staff_${lastNumber + 1}`;
    } else {
      newUserId = "staff_1";
    }
    return newUserId;
  },

  // update staff
  async updateStaff(_id, staff) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Staff.findByIdAndUpdate(_id, { $set: staff }, { new: true });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },

  // delete staff
  async deleteStaff(_id, staff) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      return await Staff.findByIdAndUpdate(_id, { $set: staff }, { new: true });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};
