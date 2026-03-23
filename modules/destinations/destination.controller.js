const DestinationService = require("./destination.service")


exports.createDestination = async (req, res) => {

  try {

    const destination = await DestinationService.createDestination(req.body)

    res.status(201).json(destination)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


exports.getDestinations = async (req, res) => {

  try {

    const destinations = await DestinationService.getDestinations()

    res.json(destinations)

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}


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

exports.getPopular = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const destinations = await DestinationService.getPopularDestinations(limit);
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const isId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

    const desti = isId 
      ? await Destination.findById(idOrSlug)
      : await DestinationService.getBySlug(idOrSlug);

    if (!desti) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(desti);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};