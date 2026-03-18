const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({

 bookingId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Booking"
 },

 amount:Number,

 method:String,

 status:{
  type:String,
  default:"pending"
 }

},{timestamps:true})

module.exports = mongoose.model("Payment",PaymentSchema)