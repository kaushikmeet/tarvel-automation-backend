const Booking = require("../bookings/booking.model")
const Payment = require("../payments/payment.model")
const User = require("../users/user.model")

exports.summary = async()=>{

 const users = await User.countDocuments()

 const bookings = await Booking.countDocuments()

 const revenue = await Payment.aggregate([
  {$group:{_id:null,total:{$sum:"$amount"}}}
 ])

 return {
   users,
   bookings,
   revenue: revenue[0]?.total || 0
 }

}