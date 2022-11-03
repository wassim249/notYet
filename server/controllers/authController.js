const User = require("../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(
    password, user.password))
    res.json({
      success: true,
      user :{_id : user._id, username : user.username} ,
    });
  else
    res.json({
      success: false,
      message: "Invalid username or password",
    });
};

const register = async (req, res) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user)
    res.json({
      success: false,
      message: "Username already exists",
    });
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      success: true,
      user: newUser,
    });
  }
};

module.exports.login = login;
module.exports.register = register;
