const service = require("./payment.service")

exports.create = async(req,res)=>{

 const payment = await service.createPayment(req.body)

 res.json(payment)

}

exports.getAll = async(req,res)=>{

 const payments = await service.getPayments()

 res.json(payments)

}

exports.verify = async(req,res)=>{

 const payment = await service.verifyPayment(req.params.id)

 res.json(payment)

}