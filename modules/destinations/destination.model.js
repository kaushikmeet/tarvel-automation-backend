const mongoose = require("mongoose");
const slugify = require("slugify");

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: String,
    images: [String],
    places: [
      {
        name: String,
        description: String,
        image: String
      }
    ],
    popularAttractions: [String],
    bestSeason: String,
    averagePrice: Number,
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// --- THE FIX: Pre-save Middleware ---
DestinationSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }
});

DestinationSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = slugify(update.name, {
      lower: true,
      strict: true
    });
  }
});

module.exports = mongoose.model("Destination", DestinationSchema);