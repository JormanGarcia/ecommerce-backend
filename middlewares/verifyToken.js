const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const verifiedToken = await jwt.verify(
    req.headers.token,
    process.env.SECRET,
    function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(400).send("Invalid Token");
      }
    }
  );
  next();
};
