const itineraryService = require("./itinerary.service");

// CREATE (Admin)
exports.create = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.user.id,
    };

    const result = await itineraryService.createItinerary(data);

    res.status(201).json({
      success: true,
      message: "Itinerary created",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await itineraryService.getAllItineraries();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ONE
exports.getOne = async (req, res) => {
  try {
    const data = await itineraryService.getItineraryById(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Itinerary not found" });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const updated = await itineraryService.updateItinerary(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE (Soft)
exports.remove = async (req, res) => {
  try {
    await itineraryService.deleteItinerary(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET BY PACKAGE ✅ FIXED
exports.getByPackage = async (req, res) => {
  try {
    const data = await itineraryService.getByPackage(
      req.params.packageId
    );

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// 🔥 CLONE ITINERARY (User Feature)
exports.clone = async (req, res) => {
  try {
    const newItinerary = await itineraryService.cloneItinerary(
      req.params.id,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Itinerary cloned",
      data: newItinerary,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateDay = async (req, res) => {
  try {
    const { id, day } = req.params;

    const updated = await itineraryService.updateDay(
      id,
      day,
      req.body
    );

    res.json({
      success: true,
      message: "Day updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getRecent = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const itineraries = await itineraryService.getRecentItineraries(limit);
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};