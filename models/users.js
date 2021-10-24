const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName:{
      type:String,
      required:true
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNo:{
      type:Number,
      required:true
    },
    profilePicture: {
      data: Buffer,
      contentType: String,
      select:false
    },
  },
  {
    timestamps: true,
  }
);

user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

user.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", user);
