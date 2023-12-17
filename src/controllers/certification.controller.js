const {errorHandler} = require("../util");
const {HttpError} = require("../error");
const { Certification} = require("../models");
const AWS = require('aws-sdk');
// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: process.env.AWS_REGION
});

// Create an instance of the S3 service
const s3 = new AWS.S3();
const createCertification = errorHandler(async (req, res) => {
    const CertificationDoc = new Certification({...req.body});
    await CertificationDoc.save();
    return {
        id: CertificationDoc.id
    }
});
const findAllCertification = errorHandler(async (req, res) => {
    const certificationDocs = await Certification.find().exec();
    return (certificationDocs?.length ? certificationDocs: [] );
})
const findCertificationById = errorHandler(async (req, res) => {
    // Validate request
    if (!req.params.id) {
        throw new HttpError(400, 'Invalid request');
    }

    const certificationDocs = await Certification.findById(req.params.id).exec();
    if (!certificationDocs) {
        throw new HttpError(400, 'Certification not found');
    }
    return certificationDocs;
});
const updateCertificationById = errorHandler(async (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!req.params.id || !req.body) {
        throw new HttpError(400, 'Invalid request');
    }
    return await Certification.findByIdAndUpdate(id, req.body, {useFindAndModify: false, new: true}).exec();
})
const deleteCertificationById = errorHandler(async (req, res) => {
    const id = req.params.id;
    // Validate request
    if (!req.params.id) {
        throw new HttpError(400, 'Invalid request');
    }
    return await Certification.findByIdAndRemove(id).exec();
})
const uploadFile = errorHandler(async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: file.name, // Use a unique filename or any other logic
        Body: file.data,
        ACL: 'bucket-owner-full-control' // Adjust the ACL permissions as needed
    };
    try {
        const data = await s3.upload(params).promise();
        res.json({ message: 'File uploaded successfully!', url: data.Location });
    } catch (err) {
        res.status(500).json({ error: 'Failed to upload file' });
    }

})
module.exports = {
    createCertification,
    findAllCertification,
    findCertificationById,
    updateCertificationById,
    deleteCertificationById,
    uploadFile
};
