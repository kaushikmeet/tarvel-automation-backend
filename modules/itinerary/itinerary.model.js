const mongoose = require("mongoose");

const dayPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
  },

  activities: [
    {
      type: String,
      trim: true,
    },
  ],

  meals: {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },

  stay: {
    type: String, 
    trim: true,
  },
});

const itinerarySchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
      index: true, 
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    duration: {
      type: Number,
      required: true,
    },

    days: {
      type: [dayPlanSchema],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "Itinerary must have at least one day",
      },
    },

    price: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ important for admin tracking
    },

    // ✅ NEW (for your feature)
    isCustom: {
      type: Boolean,
      default: false, // admin default = false, user clone = true
    },

    // ✅ NEW (for cloning / versioning)
    parentItinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Itinerary",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


// ✅ AUTO SORT DAYS
itinerarySchema.pre("save", function (next) {
  if (this.days && this.days.length > 0) {
    this.days.sort((a, b) => a.day - b.day);
  }
});


// ✅ OPTIONAL: prevent duplicate day numbers
itinerarySchema.path("days").validate(function (days) {
  const dayNumbers = days.map((d) => d.day);
  return dayNumbers.length === new Set(dayNumbers).size;
}, "Duplicate day numbers are not allowed");


module.exports = mongoose.model("Itinerary", itinerarySchema);