const Hotel = require("../models/hotel.model");

const getHotelsByFilter = async (filterObject, page) => {
  try {
    const { searchKey = "" } = filterObject;
    const limit = 10;

    const filter = {
      $or: [
        { city: { $regex: new RegExp(".*" + searchKey + ".*", "i") } },
        { hotelName: { $regex: new RegExp(".*" + searchKey + ".*", "i") } },
        { region: { $regex: new RegExp(".*" + searchKey + ".*", "i") } },
        { rating: { $regex: new RegExp(".*" + searchKey + ".*", "i") } },
      ],
    };

    const totalData = await Hotel.countDocuments(filter);
    const hotels = await Hotel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    let nextPage;
    let prevPage;
    if (page < totalData / limit - 1) {
      nextPage = Number(page) + 1;
    }
    if (page !== 1) {
      prevPage = Number(page) - 1;
    }

    return {
      message: "Success",
      data: {
        totalPage: Math.ceil(totalData / limit),
        currentPage: Number(page),
        nextPage: nextPage,
        prevPage: prevPage,
        hotels,
      },
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getHotelsById = async (id) => {
  try {
    const response = await Hotel.findById(id);
    return { message: "Success", data: response };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const createHotel = async (hotelObject) => {
  try {
    let newHotel = await Hotel.create(hotelObject);
    return { message: "Success", data: newHotel };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = { getHotelsByFilter, getHotelsById, createHotel };
