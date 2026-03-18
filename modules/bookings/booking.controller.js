const service = require("./booking.service")

exports.create = async(req,res)=>{

 try{

  const booking = await service.createBooking(req.body)

  res.status(201).json(booking)

 }catch(err){

  res.status(500).json({message:err.message})

 }

}

exports.getAll = async(req,res)=>{

 const bookings = await service.getBookings()

 res.json(bookings)

}

exports.getOne = async(req,res)=>{

 const booking = await service.getBookingById(req.params.id)

 res.json(booking)

}

exports.update = async(req,res)=>{

 const booking = await service.updateBooking(
   req.params.id,
   req.body
 )

 res.json(booking)

}

exports.remove = async(req,res)=>{

 const result = await service.deleteBooking(req.params.id)

 res.json(result)

}