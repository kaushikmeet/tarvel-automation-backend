const service = require("./auth-service.js")

exports.register = async (req,res)=>{

 try{
   const user = await service.register(req.body)
   res.status(201).json(user)

 }catch(err){
   res.status(500).json({message:err.message})
 }

}

exports.login = async (req,res)=>{

 try{
   const data = await service.login(req.body)
   res.json(data)

 }catch(err){
   res.status(400).json({message:err.message})
 }

}