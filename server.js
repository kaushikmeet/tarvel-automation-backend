require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const routes = require("./routes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static("uploads"));
app.use("/api", routes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})