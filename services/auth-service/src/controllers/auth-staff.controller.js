const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (authRepo) => ({
  // login staff
  async loginStaff(req, res) {
    try {
      const { user_id, password } = req.body;
      const staff = await authRepo.findStaffByUserId(user_id);
      if (!staff) {
        return res
          .status(400)
          .json({ error: "Tên đăng nhập không chính xác." });
      }
      const isPasswordValid = await bcrypt.compare(password, staff.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Mật khẩu không chính xác." });
      }

      // Tạo JWT
      const accessToken = jwt.sign(
        {
          user_id: staff.user_id,
          email: staff.email,
          user_name: staff.user_name,
          belong_cinema: staff.belong_cinema,
          authority: staff.authority,
        },
        process.env.SERVER_ACCESS_TOKEN,
        { expiresIn: process.env.TIME_ACCESS_TOKEN_EXPIRE }
      );

      const refreshToken = jwt.sign(
        {
          user_id: staff.user_id,
          email: staff.email,
          user_name: staff.user_name,
          belong_cinema: staff.belong_cinema,
          authority: staff.authority,
        },
        process.env.SERVER_REFRESH_TOKEN
      );

      const payload = {
        user_id: staff.user_id,
        email: staff.email,
        user_name: staff.user_name,
        belong_cinema: staff.belong_cinema,
        authority: staff.authority,
      };

      res.status(200).json({
        payload: payload,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  // refresh staff access token
  async refreshStaffAccessToken(req, res) {
    try {
      const userId = req.body.user_id;
      const refreshToken = req.body.refresh_token;
      if (!refreshToken) {
        return res
          .status(401)
          .json({ error: "Refresh token không được cung cấp." });
      }
      const staff = await authRepo.findStaffByUserId(userId);

      jwt.verify(
        refreshToken,
        process.env.SERVER_REFRESH_TOKEN,
        (err, data) => {
          if (err) {
            return res
              .status(403)
              .json({ error: "Có lỗi xảy ra khi xác thực refresh token." });
          }
          const accessToken = jwt.sign(
            {
              user_id: staff.user_id,
              email: staff.email,
              user_name: staff.user_name,
              belong_cinema: staff.belong_cinema,
              authority: staff.authority,
            },
            process.env.SERVER_ACCESS_TOKEN,
            { expiresIn: process.env.TIME_ACCESS_TOKEN_EXPIRE }
          );
          const payload = {
            user_id: staff.user_id,
            email: staff.email,
            user_name: staff.user_name,
            belong_cinema: staff.belong_cinema,
            authority: staff.authority,
          };
          res.status(200).json({
            payload: payload,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }
      );
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
});
