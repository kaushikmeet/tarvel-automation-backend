const Payment = require("./payment.model")

exports.createPayment = async(data)=>{

 return await Payment.create(data)

}

exports.getPayments = async()=>{

 return await Payment.find().populate("bookingId")

}

exports.verifyPayment = async(id)=>{

 return await Payment.findByIdAndUpdate(
   id,
   {status:"success"},
   {new:true}
 )

}