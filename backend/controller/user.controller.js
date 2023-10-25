const bcrypt = require("bcrypt");
const { UserModel } = require("../models/Users");
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config()



const formatData = (user) => {
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_ACCESS_KEY
      );

  return{
    profile_img : user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname:user.personal_info.fullname,
    token,
  }
}

const generateUsername = (email) => {
  let username = email.split("@")[0] + uuidv4().substring(0, 5);
  return username;
};

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (fullname.length < 3) {
      return res
        .status(403)
        .json({ msg: "Fullname must be at least 3 letters long" });
    }

    if (!email) {
      return res.status(403).json({ msg: "Enter Email" });
    }

    if (!emailRegex.test(email)) {
      return res.status(403).json({ msg: "Email is invalid" });
    }

    const emailExists = await UserModel.findOne({
      "personal_info.email": email,
    });
    if (emailExists) {
      return res.status(403).json({ msg: "Email is already registered" });
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(403)
        .json({ msg: "Password must be 6 letter and contain 1 uppercase letter and 1 number " });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const username = generateUsername(email);

    const newUser = new UserModel({
      personal_info: {
        fullname,
        email,
        password: hashedPass,
        username,
      },
    });

    await newUser.save();
    return res.status(200).json(formatData(newUser));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await UserModel.findOne({ "personal_info.email": email });

    if (!isUser) {
      return res.status(403).json({ msg: "User not found" });
    }

    const isPassCorrect = await bcrypt.compare(
      password,
      isUser.personal_info.password
    );

    if (!isPassCorrect) {
      return res.status(403).json({ msg: "Wrong credentials" });
    }
    res.status(200).json(formatData(isUser));
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = { 
  register,
  login,

};
