const mongoose = require("mongoose")
const slugify = require("slugify");

const ItinerarySchema = new mongoose.Schema({
    day: Number,
    title: String,
    description: String
});

const PackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    slug:{
      type: String,
      unique: true
    },

    description: String,

    destination: {
      type: mongoose.Schema.Types.ObjectId, 
        ref:"Destination",
        required: true
    },

    price: {
      type: Number,
      required: true
    },

    days: {
      type: Number,
      required: true
    },

    nights: {
      type: Number,
      required: true
    },

    maxTravelers: {
      type: Number,
      default: 10
    },

    images: [String],

    itinerary: [
      ItinerarySchema
    ],

    isActive: {
      type: Boolean,
      default: true
    },

    category: {
      type: String,
      required: true,
      enum: ["Honeymoon", "Adventure", "Luxury", "Family", "Budget", "Solo"],
      index: true
    },
    tags: [{
      type: String,
      enum: [
        "Romance", "Beach", "Cultural", "Wildlife", "Wellness", "Cruise",
        "Trekking", "Safari", "Skiing", "Diving", "Road Trip", "City Break"
      ],
      index: true
    }],
  },
  {
    timestamps: true
  },

)

PackageSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    });
  }
});

PackageSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.title) {
    update.slug = slugify(update.title, {
      lower: true,
      strict: true
    });
  }
});

module.exports = mongoose.model("Package", PackageSchema)