// backend/routes/prescriptionRoutes.js
import express from 'express';
import { getPrescriptions, uploadPrescription } from '../controllers/prescriptionController.js';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });  // Middleware for handling file uploads

// GET /api/prescriptions - Get all prescriptions
router.get('/', authMiddleware, prescriptionController.getPrescriptions);

// POST /api/upload - Upload prescription data (with file)
router.post('/upload', authMiddleware, upload.single('prescription'), prescriptionController.uploadPrescription);

export default router;
