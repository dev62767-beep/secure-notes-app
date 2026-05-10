const User = require("../models/user.model");
const Note = require("../models/notes.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "email");

    res.status(200).json({
      success: true,
      notes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getAllNotes
};