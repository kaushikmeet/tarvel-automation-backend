const service = require("./analytics.service")

exports.summary = async(req,res)=>{

 const data = await service.summary()

 res.json(data)

}