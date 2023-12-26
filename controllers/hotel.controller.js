const hotelService = require("../services/hotel.service");

const getHotelsByFilter = async (req, res) => {
  console.log(req.body);
  try {
    let { message, data } = await hotelService.getHotelsByFilter(req.body);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHotelsById = async (req, res) => {
  try {
    let { message, data } = await hotelService.getHotelsById(req.params.id);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHotel = async (req, res) => {
  try {
    let { message, data } = await hotelService.createHotel(req.body);
    res.json({ message, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHotelsByFilter, getHotelsById, createHotel };
