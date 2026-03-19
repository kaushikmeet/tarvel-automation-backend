const Itinerary = require("./itinerary.model");

// CREATE
exports.createItinerary = async (data) => {
  const itinerary = new Itinerary(data);
  return await itinerary.save();
};

// GET ALL
exports.getAllItineraries = async () => {
  return await Itinerary.find({ isActive: true })
    .populate("packageId", "title price")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};

// GET BY ID
exports.getItineraryById = async (id) => {
  return await Itinerary.findById(id)
    .populate("packageId", "title price")
    .populate("createdBy", "name email");
};

// UPDATE
exports.updateItinerary = async (id, data) => {
  return await Itinerary.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true, // ✅ important
  });
};

// DELETE (Soft Delete Recommended)
exports.deleteItinerary = async (id) => {
  return await Itinerary.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
};

// GET BY PACKAGE ✅ FIXED
exports.getByPackage = async (packageId) => {
  return await Itinerary.find({
    packageId,
    isActive: true,
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
};


// 🔥 CLONE (VERY IMPORTANT FEATURE)
exports.cloneItinerary = async (id, userId) => {
  const original = await Itinerary.findById(id);

  if (!original) throw new Error("Itinerary not found");

  const clone = new Itinerary({
    packageId: original.packageId,
    title: original.title + " (Custom)",
    description: original.description,
    duration: original.duration,
    days: original.days,
    price: original.price,

    createdBy: userId,
    isCustom: true,
    parentItinerary: original._id,
  });

  return await clone.save();
};

// day-wise-update
exports.updateDay = async(itineraryId, dayNumber, updateData) => {
  const itinerary = await Itinerary.findById(itineraryId);
  if (!itinerary) throw new Error("Itinerary not found");

  const dayIndex = itinerary.days.findIndex(
    (d) => d.day === Number(dayNumber)
  );

  if(dayIndex === -1){
    throw new Error("Day not found");
  }

  itinerary.days[dayIndex] ={
    ...itinerary.days[dayIndex]._doc,
    ...updateData,
    day:Number(dayNumber)
  };

  await itinerary.save();

  return itinerary;
}

exports.getRecentItineraries = async (limit = 6) => {
  return await Itinerary.find({ isActive: true, isCustom: false })
    .populate("packageId", "title images destination price") 
    .populate("createdBy", "name")
    .sort({ createdAt: -1 }) 
    .limit(limit);
};