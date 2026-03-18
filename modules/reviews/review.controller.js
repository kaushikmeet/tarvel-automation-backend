const service = require("./review.service")

exports.create = async(req,res)=>{

 const review = await service.createReview(req.body)

 res.json(review)

}

exports.getByPackage = async(req,res)=>{

 const reviews = await service.getReviewsByPackage(req.params.id)

 res.json(reviews)

}

exports.remove = async(req,res)=>{

 const result = await service.deleteReview(req.params.id)

 res.json(result)

}