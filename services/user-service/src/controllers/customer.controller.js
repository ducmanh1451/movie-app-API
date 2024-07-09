const bcrypt = require("bcrypt");

module.exports = (userRepo) => ({
  // get all
  async findCustomer(req, res) {
    try {
      const customer = await userRepo.findCustomer(req.params._id);
      res.status(200).json({ payload: customer });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // update customer information
  async updateCustomer(req, res) {
    try {
      const customerId = req.params._id;
      const {
        customer_name,
        phone_number,
        address,
        password,
        is_change_password,
        new_password,
      } = req.body;
      // get old password
      const customer = await userRepo.findCustomer(customerId);
      const oldPasswordHash = customer[0].password;

      let newPasswordHash = await bcrypt.hash(
        new_password,
        parseInt(process.env.SALT_ROUNDS)
      );
      if (is_change_password) {
        const isDuplicatePassword = await bcrypt.compare(
          new_password,
          password
        );
        if (isDuplicatePassword) {
          return res
            .status(400)
            .json({ error: "Mật khẩu mới không được trùng mật khẩu cũ." });
        }
      } else {
        newPasswordHash = oldPasswordHash;
      }

      const currentDateTime = new Date();
      await userRepo.updateCustomer(customerId, {
        customer_name,
        phone_number,
        address,
        password: newPasswordHash,
        update_date: currentDateTime,
      });
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
