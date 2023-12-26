const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  hotelId: { type: Schema.Types.ObjectId, required: true, ref: "Hotel" },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  hotelName: { type: String, required: true },
  hotelCity: { type: String, required: true },
  hotelLocation: { type: String, required: true },
  roomCount: { type: String, required: true },
  guestCount: { type: String, required: true },
  hotelImage: { type: String, required: true },
  price: { type: Number },
  paymentMode: { type: String, enum: ["Online", "Offline"], required: true },
  paymentStatus: { type: String, enum: ["Paid", "Not Paid"], required: true },
});

const BookingModel = model("Booking", bookingSchema);

module.exports = BookingModel;
