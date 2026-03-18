const User = require("./user.model")
const bcrypt = require("bcryptjs")

exports.createUser = async (data) => {

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || "user",
    phone: data.phone
  })

  return user
}


exports.getUsers = async () => {

  return await User.find().select("-password")

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