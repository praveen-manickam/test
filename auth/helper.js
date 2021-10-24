const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const Helper = {
  async generateToken(email) {
    const userData = await Users.findOne({ email });
    const token = jwt.sign(
      {
        userId: userData.userId,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
        profilePicture: userData.profilePicture,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWTexpiresIn }
    );
    return token;
  },

  async verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      return res.status(401).send({
        message: "Token not found",
      });
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const userData = await Users.findOne({ userId: decoded.userId });
      if (userData) {
        req.user = {
          userId: userData.userId,
          email: userData.email,
          dateOfBirth: userData.dateOfBirth,
        };
        next();
      } else {
        return res.status(401).send("User not found!");
      }
    } catch (error) {
      return res.status(401).send(error.message);
    }
  },
};

module.exports = Helper;
