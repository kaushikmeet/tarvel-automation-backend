const User = require("./user.model")

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};



exports.getUsers = async () => {
  return await User.find().select("-password");
}


exports.getUserById = async (id) => {

  const user = await User.findById(id).select("-password")

  if (!user) throw new Error("User not found")

  return user
}


exports.updateUser = async (id, data) => {

  const user = await User.findByIdAndUpdate(
    id,
    data,
    { new: true }
  ).select("-password")

  if (!user) throw new Error("User not found")

  return user
}


exports.deleteUser = async (id) => {

  const user = await User.findByIdAndDelete(id)

  if (!user) throw new Error("User not found")

  return { message: "User deleted successfully" }

}