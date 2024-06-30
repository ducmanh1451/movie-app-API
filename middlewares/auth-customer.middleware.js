const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Token không được cung cấp." });
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN);
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token không hợp lệ." });
  }
};

module.exports = verifyToken;
