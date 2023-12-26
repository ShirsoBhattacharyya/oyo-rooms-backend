const { Schema, model } = require("mongoose");

const hotelSchema = new Schema({
  hotelName: { type: String, required: true },
  address: { type: String, required: true },
  region: { type: String, required: true },
  distance: { type: String },
  city: { type: String, required: true },
  info: { type: String, required: true },
  rating: { type: String, required: true },
  ratingCount: { type: String },
  ratingStatus: { type: String },
  price: { type: String, required: true },
  strikedPrice: { type: String, required: true },
  discount: { type: String, required: true },
  facilities: [
    {
      name: { type: String, required: true },
      available: { type: String, default: false },
    },
  ],
  images: [{ type: String, required: true }],
});

const HotelModel = model("Hotel", hotelSchema);

module.exports = HotelModel;
