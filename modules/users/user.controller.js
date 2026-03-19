const UserService = require("./user.service")


exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide name, email, and password" 
      });
    }

    const existingUser = await UserService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User already registered with this email" 
      });
    }

    // 3. Create the user 
    const user = await UserService.createUser(req.body);

    // 4. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      data: userResponse
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + error.message 
    });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getUsers(req, res); 
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.getUserById = async (req, res) => {

  try {

    const user = await UserService.getUserById(req.params.id)

    res.json(user)

  } catch (error) {

    res.status(404).json({ message: error.message })

  }

}


exports.updateUser = async (req, res) => {

  try {

    const user = await UserService.updateUser(
      req.params.id,
      req.body
    )

    res.json(user)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


exports.deleteUser = async (req, res) => {

  try {

    const result = await UserService.deleteUser(req.params.id)

    res.json(result)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}