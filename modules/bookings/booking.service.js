const Booking = require("./booking.model")

exports.createBooking = async(data)=>{

 return await Booking.create(data)

}

exports.getBookings = async()=>{

 return await Booking
   .find()
   .populate("userId packageId")

}

exports.getBookingById = async(id)=>{

 return await Booking
   .findById(id)
   .populate("userId packageId")

}

exports.updateBooking = async(id,data)=>{

 return await Booking.findByIdAndUpdate(
   id,data,{new:true}
 )

}

exports.deleteBooking = async(id)=>{

 await Booking.findByIdAndDelete(id)

 return {message:"Booking deleted"}

}