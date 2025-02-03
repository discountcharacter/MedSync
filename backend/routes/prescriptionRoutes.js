const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// GET /api/prescriptions
router.get('/', authMiddleware, prescriptionController.getPrescriptions);

// POST /api/upload
router.post('/upload', authMiddleware, upload.single('prescription'), prescriptionController.uploadPrescription);

module.exports = router;