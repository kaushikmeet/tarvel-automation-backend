const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({

 userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 },

 packageId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Package"
 },

 rating:Number,

 comment:String

},{timestamps:true})

module.exports = mongoose.model("Review",ReviewSchema)