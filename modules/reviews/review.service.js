const Review = require("./review.model")

exports.createReview = async(data)=>{

 return await Review.create(data)

}

exports.getReviewsByPackage = async(packageId)=>{

 return await Review
   .find({packageId})
   .populate("userId")

}

exports.deleteReview = async(id)=>{

 await Review.findByIdAndDelete(id)

 return {message:"Review removed"}

}