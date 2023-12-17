const express = require('express');
const controllers = require("../controllers");
const router = express.Router();

router.post('/',controllers.certification.createCertification);
router.get('/',  controllers.certification.findAllCertification);
router.get('/:id',  controllers.certification.findCertificationById);
router.put('/:id',  controllers.certification.updateCertificationById);
router.delete('/:id',controllers.certification.deleteCertificationById);
router.post('/upload-file',  controllers.certification.uploadFile);

module.exports = router;
