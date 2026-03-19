const PackageService = require("./package.service");


const parseItinerary =(data)=>{
  if(!data) return [];

  if(typeof data === "object"){
    return Array.isArray(data) ? data: [data];
  };

  try{
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [parsed];

  } catch(err){
    return []
  }
}

// CREATE PACKAGE
exports.createPackage = async (req, res) => {
  try {
   const images = req.files?.map(f=> f.filename) || [];

    const data = {
      ...req.body,
      images,
      itinerary: parseItinerary(req.body.itinerary)
    };

    const pkg = await PackageService.createPackage(data);

    res.status(201).json(pkg);
    
  } catch (err) {
    res.status(500).json({
      message: "Error creating package",
      error: err.message
    });
  }
};

// GET ALL
exports.getAllPackages = async (req, res) => {
  try {
    const data = await PackageService.getAllPackages();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getPackageById = async (req, res) => {
  try {
    const data = await PackageService.getPackageById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updatePackage = async (req, res) => {
  try {
    const images = req.files?.map(f => f.filename) || [];

    const data = {
      ...req.body,
      images,
      itinerary: parseItinerary(req.body.itinerary)
    };

    if (images.length) {
      data.images = images;
    }

    const updated = await PackageService.updatePackage(
      req.params.id,
      data
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: "Error updating package",
      error: err.message
    });
  }
};

// DELETE
exports.deletePackage = async (req, res) => {
  try {
    await PackageService.deletePackage(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.searchPackages = async (req, res) => {

  try {

    const result = await PackageService.searchPackages(req.query)

    res.json(result)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}

exports.getRecommended = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const packages = await PackageService.getRecommendedPackages(limit);
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const pkg = idOrSlug.match(/^[0-9a-fA-F]{24}$/) 
                ? await Package.findById(idOrSlug).populate("destination")
                : await PackageService.getBySlug(idOrSlug);

    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};