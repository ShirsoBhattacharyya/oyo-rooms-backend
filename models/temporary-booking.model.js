const { Schema, model } = require("mongoose");

const temporaryBookingSchema = new Schema({
  hotelId: { type: Schema.Types.ObjectId, required: true, ref: "Hotel" },
  userDetails: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  hotelLocation: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  roomCount: { type: String, required: true },
  guestCount: { type: String, required: true },
  hotelImage: { type: String, required: true },
  price: { type: Number },
});

const TemporaryBookingModel = model("TemporaryBooking", temporaryBookingSchema);

module.exports = TemporaryBookingModel;
