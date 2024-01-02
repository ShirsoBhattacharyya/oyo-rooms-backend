const Booking = require("../models/booking.model");

const getBookingById = async (id) => {
  try {
    const response = await Booking.findById(id);
    return { message: "Success", data: response };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getBookingByFilter = async (filterObject) => {
  try {
    console.log({ filterObject });
    const response = await Booking.find({
      "userDetails.email": filterObject?.email,
    });
    console.log({ response });
    return { message: "Success", data: response };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const createBooking = async (bookingObject) => {
  try {
    let newBooking = await Booking.create(bookingObject);
    return { message: "Success", data: newBooking };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = { getBookingById, getBookingByFilter, createBooking };
