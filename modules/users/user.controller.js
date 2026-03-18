const UserService = require("./user.service")


exports.createUser = async (req, res) => {
  try {

    const user = await UserService.createUser(req.body)

    res.status(201).json(user)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }
}


exports.getUsers = async (req, res) => {

  try {

    const users = await UserService.getUsers()

    res.json(users)

  } catch (error) {

    res.status(500).json({ message: error.message })

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