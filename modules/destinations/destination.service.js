const Destination = require("./destination.model")


exports.createDestination = async (data) => {

  const destination = await Destination.create(data)

  return destination
}


exports.getDestinations = async () => {

  return await Destination.find({ isActive: true })

}


exports.getDestinationById = async (id) => {

  const destination = await Destination.findById(id)

  if (!destination) throw new Error("Destination not found")

  return destination
}


exports.updateDestination = async (id, data) => {

  const destination = await Destination.findByIdAndUpdate(
    id,
    data,
    { new: true }
  )

  if (!destination) throw new Error("Destination not found")

  return destination
}


exports.deleteDestination = async (id) => {

  const destination = await Destination.findByIdAndDelete(id)

  if (!destination) throw new Error("Destination not found")

  return { message: "Destination deleted successfully" }

}


exports.searchDestinations = async (query) => {

  const filter = {}

  if (query.name) {
    filter.name = new RegExp(query.name, "i")
  }

  if (query.country) {
    filter.country = new RegExp(query.country, "i")
  }

  return await Destination.find(filter)

}

exports.getPopularDestinations = async (limit = 6) => {
  return await Destination.find({ isActive: true })
    .select("name city country images averagePrice") 
    .sort({ createdAt: -1 }) 
    .limit(limit);
};

exports.getBySlug = async (slug) => {
  return await Destination.findOne({ slug, isActive: true });
};