const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const bookingSchema = new Schema({
    userDetails: {
        name: String,
        email: String,
        contactNumber: String,
    },
    vehicleInfo: {
        make: String,
        model: String,
        registrationNumber: String,
    },
    testDetails: {
        testType: String,
        preferredDate: Date,
        timeSlot: String,
        specialRequirements: String,
    },
    status: {
        type: String,
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
