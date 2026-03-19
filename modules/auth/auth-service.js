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

exports.login = async (email, password) => {
  // 1. Find user
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // 3. Generate token
  const token = jwt.sign({ id: user._id, role: user.role }, "SECRET", { expiresIn: "1d" });

  return { token, user };
};