const bcrypt = require("bcrypt");

module.exports = (userRepo) => ({
  // get all staffs
  async getAllStaffs(req, res) {
    try {
      const staffs = await userRepo.getAllStaffs();
      res.status(200).json({ payload: staffs });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // get staffs by authority
  async getStaffsByAuthority(req, res) {
    try {
      const userId = req.params._id;
      const staffLogin = await userRepo.findStaffByUserId(userId);
      let staffs = [];
      const authority = staffLogin[0]["authority"];
      const belong_cinema = staffLogin[0]["belong_cinema"];
      if (authority == 1) {
        staffs = await userRepo.getAllStaffs();
      }
      if (authority == 2) {
        const authStaffs = await userRepo.getStaffsByAuthority(3, belong_cinema);
        staffs = staffLogin.concat(authStaffs);
      }
      if (authority == 3) {
        staffs = staffLogin;
      }
      res.status(200).json({ payload: staffs });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // create staff
  async createStaff(req, res) {
    try {
      const {
        user_name,
        password,
        authority,
        belong_cinema,
        belong_cinema_name,
        gender,
        email,
        phone_number,
        address,
      } = req.body;
      const currentDateTime = new Date();
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
      const newStaff = await userRepo.addNewStaff({
        user_name,
        password: hashedPassword,
        authority,
        belong_cinema,
        belong_cinema_name,
        gender,
        email,
        phone_number,
        address,
        create_date: currentDateTime,
        update_date: null,
        delete_date: null,
      });
      res.status(200).json({ payload: newStaff });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // update staff
  async updateStaff(req, res) {
    try {
      const userId = req.params._id;
      const {
        user_name,
        password,
        authority,
        belong_cinema,
        belong_cinema_name,
        email,
        phone_number,
        address,
      } = req.body;
      const currentDateTime = new Date();
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
      await userRepo.updateStaff(userId, {
        user_name,
        authority,
        belong_cinema,
        belong_cinema_name,
        email,
        phone_number,
        password: hashedPassword,
        address,
        update_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // delete staff
  async deleteStaff(req, res) {
    try {
      const _id = req.params._id;
      const currentDateTime = new Date();
      await userRepo.deleteStaff(_id, {
        delete_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
