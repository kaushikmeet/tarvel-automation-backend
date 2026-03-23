const mongoose = require("mongoose")

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug:{
      type: String,
      unique: true
    },

    country: {
      type: String,
      required: true
    },

    city:{
      type: String,
      required: true,
    },

    description: String,

    images: [String],

    places:[
      {
        name:String,
        description:String,
        image:String
      }
    ],
    
    popularAttractions: [String],

    bestSeason: String,

    averagePrice: Number,

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Destination", DestinationSchema)