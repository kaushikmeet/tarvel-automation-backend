const Package = require("./package.model")


exports.createPackage = async (data) => {
  return await Package.create(data);
};


exports.getAllPackages = async () => {
  return await Package.find()
    .populate("destination", "name city")
    .sort({ createdAt: -1 });
};


exports.getPackageById = async (id) => {
  return await Package.findById(id).populate("destination");
};


exports.updatePackage = async (id, data) => {
  return await Package.findByIdAndUpdate(id, data, {
    new: true
  });
};


exports.deletePackage = async (id) => {
  return await Package.findByIdAndDelete(id);
};


exports.searchPackages = async (query) => {

  const filter = {}

  if (query.destination) {
    filter.destination = new RegExp(query.destination, "i")
  }

  if (query.price) {
    filter.price = { $lte: Number(query.price) }
  }

  if (query.days) {
    filter.days = Number(query.days)
  }

  return await Package.find(filter)

}