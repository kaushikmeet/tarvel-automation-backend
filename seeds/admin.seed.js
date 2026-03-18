require("dotenv").config()

const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const User = require("../modules/users/user.model")

async function seedAdmin(){

  try{

    await mongoose.connect(process.env.MONGO_URI)

    const existing = await User.findOne({ email: "admin@travel.com" })

    if(existing){
      console.log("Admin already exists")
      process.exit()
    }

    const password = await bcrypt.hash("admin123", 10)

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@travel.com",
      password: password,
      role: "admin"
    })

    console.log("Admin created:", admin.email)

    process.exit()

  }catch(err){

    console.error(err)
    process.exit(1)

  }

}

seedAdmin()