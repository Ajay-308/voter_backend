const jwt = require("jsonwebtoken");

const jwtAuthTokenMiddleWare = (req, res, next) => {
  const authorization = req.header.authorization;
  if (!authorization)
    return res
      .status(401)
      .json({ error: "access denied token hi 9 hai tumpr" });

  //jwt token le lo request header se
  const token = req.header.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized access" });
  // token verify karo

  try {
    const verified = jwt.verify(token, process.env.Jwt_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "invalid token" });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.Jwt_SECRET, { expiresIn: "1d" });
};

module.exports = { jwtAuthToken, generateToken };
