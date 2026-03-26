const mongoose = require('mongoose');
const DestinationService = require("./destination.service");

const Destination = require("./destination.model")



exports.createDestination = async (req, res) => {
  try {
    let data = req.body;

    if (req.files && req.files.length > 0) {
      data.images = req.files.map(file => file.filename); 
    }

    if (typeof data.places === 'string') {
      try {
        data.places = JSON.parse(data.places);
      } catch (e) {
        return res.status(400).json({ success: false, message: "Invalid format for 'places' field" });
      }
    }

    if (typeof data.popularAttractions === 'string') {
        data.popularAttractions = JSON.parse(data.popularAttractions);
    }

    const destination = await DestinationService.createDestination(data);
    
    res.status(201).json({
      success: true,
      data: destination
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllDestinations = async (req, res) => {
  try {
    const list = await Destination.find({ isActive: true });

    for (let d of list) {
      if (!d.slug || d.slug === "") {
        d.slug = d.name.toLowerCase().trim().replace(/\s+/g, '-');
        await d.save();
      }
    }

    return res.status(200).json({ 
      success: true, 
      data: list 
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


exports.getDestinations = async (req, res) => {
  try {
    const { search, maxPrice, season, sort, page = 1 } = req.query;
    const limit = 9;
    const skip = (page - 1) * limit;

    let query = { isActive: true };

    if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { city: { $regex: req.query.search, $options: 'i' } },
      { country: { $regex: req.query.search, $options: 'i' } }
    ];
  }

    // 2. Filter Logic
    if (maxPrice) query.averagePrice = { $lte: Number(maxPrice) };
    if (season) query.bestSeason = { $regex: season, $options: 'i' };

    // 3. Sorting Logic
    let sortOrder = { createdAt: -1 };
    if (sort === 'priceLow') sortOrder = { averagePrice: 1 };
    if (sort === 'priceHigh') sortOrder = { averagePrice: -1 };

    // 4. Data Fetching
    const data = await Destination.find(query)
      .select("name city country images averagePrice slug bestSeason") // <--- SLUG IS COMPULSORY HERE
      .sort(sortOrder)
      .skip(skip)
      .limit(limit);

    for (let d of data) {
      if (!d.slug || d.slug === 'undefined') {
        d.slug = d.name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
        await d.save(); 
      }
    }

    const total = await Destination.countDocuments(query);

    res.json({ 
      success: true, 
      data, 
      total,
      pages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getDestinationById = async (req, res) => {

  try {

    const destination = await DestinationService.getDestinationById(req.params.id)

    res.json(destination)

  } catch (error) {

    res.status(404).json({ message: error.message })

  }

}


exports.updateDestination = async (req, res) => {

  try {

    const destination = await DestinationService.updateDestination(
      req.params.id,
      req.body
    )

    res.json(destination)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


exports.deleteDestination = async (req, res) => {

  try {

    const result = await DestinationService.deleteDestination(req.params.id)

    res.json(result)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


exports.searchDestinations = async (req, res) => {

  try {

    const result = await DestinationService.searchDestinations(req.query)

    res.json(result)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

// destination.controller.js
exports.getPopular = async (req, res) => {
  try {
    const list = await DestinationService.getPopularDestinations();

    for (let d of list) {
      if (!d.slug) {
        d.slug = d.name.toLowerCase().trim().replace(/\s+/g, '-');
        await d.save();
      }
    }

    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    

    if (!slug) {
      return res.status(400).json({ 
        success: false, 
        message: "Destination slug is required" 
      });
    }

    const data = await DestinationService.getBySlug(slug);

    if (!data && mongoose.Types.ObjectId.isValid(slug)) {
    data = await Destination.findById(slug);
  }

    if (!data) {
      return res.status(404).json({ 
        success: false, 
        message: `No active destination found with slug: ${slug}` 
      });
    }

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

