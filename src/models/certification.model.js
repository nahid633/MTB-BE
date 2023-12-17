const mongoose = require('mongoose');
const {Schema, model} = require("mongoose");

const certificationSchema = new Schema({
    fullName: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    companyName: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200
    },
    updateTitle: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200
    },
    versionNumber: {
        type: String,
        required: false,
        trim: true,
        maxlength: 50
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    changeLog: {
        type: String,
        required: false
    },
    technicalOverview: {
        type: String,
        required: false
    },
    installationGuide: {
        type: String,
        required: false
    },
    testCases: {
        type: String,
        required: false
    },
    sourceCode: {
        type: String,
        required: false,
        trim: true
    },
    developerNotes: {
        type: String,
        required: false
    },
    termsAndConditions: {
        type: Boolean,
        required: false
    }
});

const Certification = model('Certification', certificationSchema);

module.exports = Certification;
