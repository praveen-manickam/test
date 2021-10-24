const Users = require("../models/users");
const statusCodes = require("../config/statusCodes");
const { v4: uuidv4 } = require("uuid");
const helper = require("../auth/helper");

const signUp = async (req, res) => {
  try {
    let { email, password, dateOfBirth, phoneNo, userName } = req.body;
    let error = {};
    if (!email || !password || !phoneNo || !userName || !dateOfBirth) {
      if (!email) error.email = "Please enter email address";
      if (!password) error.password = "Please enter password";
      if (!phoneNo) error.email = "Please enter phoneNo";
      if (!userName) error.password = "Please enter userName";
      if (!dateOfBirth) error.password = "Please enter dateOfBirth";

      return res.status(statusCodes.HTTP_BAD_REQUEST).json({ error });
    }

    if (password.length < 8)
      return res.status(statusCodes.HTTP_BAD_REQUEST).json({
        success: false,
        message: "Password must be more than 8 characters",
      });

    const userData = await Users.findOne({ email });
    if (userData)
      return res
        .status(statusCodes.HTTP_BAD_REQUEST)
        .json({ success: false, message: "Email already exists!" });

    await Users.create({
      userId: uuidv4(),
      email,
      password,
      dateOfBirth,
      phoneNo,
      userName,
    });
    res
      .status(statusCodes.HTTP_CREATED)
      .json({ success: true, message: "Registered successfully!" });
  } catch (error) {
    res
      .status(statusCodes.HTTP_SERVER_ERROR)
      .json({ success: false, message: "Failed to signup!" });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const candidateData = await Users.findOne({ email }).select("+password");
    if (!candidateData)
      return res
        .status(statusCodes.HTTP_BAD_REQUEST)
        .json({ success: false, message: "No email found!" });

    if (!candidateData.password)
      return res
        .status(statusCodes.HTTP_BAD_REQUEST)
        .json({ success: false, message: "Incorrect password!" });

    const isMatch = await candidateData.matchPassword(password);

    if (!isMatch)
      return res.status(statusCodes.HTTP_BAD_REQUEST).json({
        success: false,
        message: "password incorrect!",
      });
    var token = await helper.generateToken(candidateData.email);

    res.status(statusCodes.HTTP_OK).json({ success: true, token: token });
  } catch (error) {
    res
      .status(statusCodes.HTTP_BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

const uploadProfilePic = async (req, res) => {
  try {
    let profilePicture = {};
    let imageBuffer = req.file.buffer;
    let encodedImage = Buffer.from(imageBuffer).toString("base64");
    profilePicture.data = encodedImage;
    profilePicture.contentType = "image/jpg";

    await Users.findOneAndUpdate(
      { userId: req.user.userId },
      { profilePicture }
    );
    res
      .status(statusCodes.HTTP_OK)
      .json({ success: true, message: "uploaded successfully!" });
  } catch (error) {
    res.status(statusCodes.HTTP_BAD_REQUEST).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userData = await Users.findOne({ userId: req.user.userId }).select(
      "-profilePicture"
    );
    res.status(statusCodes.HTTP_OK).json({ success: true, data: userData });
  } catch (error) {
    res.status(statusCodes.HTTP_BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  login,
  uploadProfilePic,
  getUser,
};
