import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GET /api/prescriptions
router.get('/', authMiddleware, prescriptionController.getPrescriptions);

// POST /api/upload
router.post('/upload', authMiddleware, upload.single('prescription'), prescriptionController.uploadPrescription);

export default router;
