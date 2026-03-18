const User = require("../users/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (data) => {

  const existingUser = await User.findOne({ email: data.email })

  if (existingUser) {
    throw new Error("Email already registered")
  }

  const hashed = await bcrypt.hash(data.password, 10)

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashed,
    role: data.role || "user"
  })

  return user
}

exports.login = async ({ email, password }) => {

  const user = await User.findOne({ email })

  if (!user) throw new Error("User not found")

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) throw new Error("Invalid password")

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  }
}