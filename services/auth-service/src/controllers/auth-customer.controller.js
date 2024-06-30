const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (authRepo) => ({
  // get customer 
  async findCustomer(req, res) {
    try {
      const customer = await authRepo.findCustomer(req.params.id);
      res.status(200).json({ payload: customer });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

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
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      // check duplicate email
      const response = await authRepo.findCustomerByEmail(email);
      if (response) {
        return res.status(400).json({ error: "Email đã được đăng kí." });
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

  // login customer
  async loginCustomer(req, res) {
    try {
      const { email, password } = req.body;
      const customer = await authRepo.findCustomerByEmail(email);
      if (!customer) {
        return res.status(400).json({ error: "Email không chính xác." });
      }
      const isPasswordValid = await bcrypt.compare(password, customer.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Mật khẩu không chính xác." });
      }

      // Tạo JWT
      const accessToken = jwt.sign(
        { customer_id: customer._id, email: customer.email, customer_name: customer.customer_name },
        process.env.ACCESS_TOKEN,
        { expiresIn: process.env.TIME_ACCESS_TOKEN_EXPIRE }
      );
      const refreshToken = jwt.sign(
        { customer_id: customer._id, email: customer.email, customer_name: customer.customer_name },
        process.env.REFRESH_TOKEN
      );
      const payload = {
        customer_id: customer._id,
        email: customer.email,
        customer_name: customer.customer_name
      }
      // await authRepo.updateRefreshTokenCustomer(customer._id, refreshToken);

      res.status(200).json({ payload: payload, accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // refresh customer access token 
  async refreshCustomerAccessToken(req, res) {
    try {
      const customerId = req.body.customer_id;
      const refreshToken = req.body.refresh_token;
      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token không được cung cấp." });
      }
      // const customer = await authRepo.verifyCustomerRefreshToken(customerId, refreshToken);
      // if (!customer) {
      //   return res.status(403).json({ error: 'Refresh token không hợp lệ.' });
      // }

      const customer = await authRepo.findCustomer(customerId);

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, data) => {
        if (err) {
          return res.status(403).json({ error: 'Có lỗi xảy ra khi xác thực refresh token.' });
        }
        const accessToken = jwt.sign(
          { customer_id: customer._id, email: customer.email, customer_name: customer.customer_name },
          process.env.ACCESS_TOKEN,
          { expiresIn: process.env.TIME_ACCESS_TOKEN_EXPIRE }
        )
        const payload = {
          customer_id: customer._id,
          email: customer.email,
          customer_name: customer.customer_name
        }
        res.status(200).json({ payload: payload, accessToken: accessToken, refreshToken: refreshToken });
      })
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // logout customer
  async logoutCustomer(req, res) {
    try {
      await authRepo.clearCustomerRefreshToken(req.body.customer_id);
      res.status(200).json({ payload: '' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // // verify customer access token when send request
  // async verifyCustomerAccessToken(req, res) {
  //   try {
  //     const accessToken = req.body.access_token;
  //     if (!accessToken) {
  //       return res.status(401).json({ error: "Access token không được cung cấp." });
  //     }
  //     jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, data) => {
  //       if (err) {
  //         if (err.name === 'TokenExpiredError') {
  //           return res.status(403).json({ error: 'Token đã hết hạn.' });
  //         }
  //         return res.status(401).json({ error: 'Có lỗi xảy ra khi xác thực access token.' });
  //       }
  //       res.status(200).json({ payload: 'Token hợp lệ.' });
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error });
  //   }
  // }
});
