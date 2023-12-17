const {errorHandler} = require("../util");
const {HttpError} = require("../error");
const { Booking} = require("../models");

const createBooking = errorHandler(async (req, res) => {
    const bookingDoc = new Booking({...req.body});
    await bookingDoc.save();
    return {
        id: bookingDoc.id
    }
});
const findAllBooking = errorHandler(async (req, res) => {
    const bookingDocs = await Booking.find().exec();
    return (bookingDocs?.length ? bookingDocs: [] );
})
const findBookingById = errorHandler(async (req, res) => {
    // Validate request
    if (!req.params.id) {
        throw new HttpError(400, 'Invalid request');
    }

    const bookingDocs = await Booking.findById(req.params.id).exec();
    if (!bookingDocs) {
        throw new HttpError(400, 'Job not found');
    }
    return bookingDocs;
});
const updateBookingById = errorHandler(async (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!req.params.id || !req.body) {
        throw new HttpError(400, 'Invalid request');
    }
    return await Booking.findByIdAndUpdate(id, req.body, {useFindAndModify: false, new: true}).exec();
})
const deleteBookingById = errorHandler(async (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!req.params.id) {
        throw new HttpError(400, 'Invalid request');
    }
    return await Booking.findByIdAndRemove(id).exec();
})
module.exports = {
    createBooking,
    findAllBooking,
    findBookingById,
    updateBookingById,
    deleteBookingById,
};
