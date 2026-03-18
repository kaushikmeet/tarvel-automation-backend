const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  packageId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Package"
  },

  travelers:Number,

  travelDate:Date,

  totalPrice:Number,

  status:{
    type:String,
    default:"pending"
  }

},{timestamps:true})

module.exports = mongoose.model("Booking",BookingSchema)