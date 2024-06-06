const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = (authRepo) => ({
  // register customer
  async registerCustomer(req, res) {
    try {
      const {
        customer_name,
        phone_number,
        birthday,
        gender,
        email,
        password,
        address,
      } = req.body;
      const currentDateTime = new Date();
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      // check duplicate email
      const response = await authRepo.checkDuplicateEmailCustomer(email)
      if (response) {
        return res.status(400).json({ error: 'Email đã được đăng kí.' });
      }

      const customer = await authRepo.registerCustomer({
        customer_name,
        phone_number,
        birthday,
        gender,
        email,
        password: hashedPassword,
        address,
        create_date: currentDateTime,
        update_date: null,
        delete_date: null,
      });
      res.status(200).json({ payload: customer });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
