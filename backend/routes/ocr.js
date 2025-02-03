import express from 'express';
import multer from 'multer';
import Tesseract from 'tesseract.js';
import Prescription from '../models/Prescription.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload and process OCR
router.post('/upload', upload.single('prescription'), async (req, res) => {
  const { userId } = req.body;
  const imagePath = req.file.path;

  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    
    // Example parsing logic - adapt this to parse actual OCR text
    const parsedDoctorName = 'Parsed Doctor Name'; // Replace with actual parsed data from OCR
    const parsedPatientName = 'Parsed Patient Name'; // Replace with actual parsed data from OCR
    const parsedMedicines = ['Parsed Medicine 1', 'Parsed Medicine 2']; // Example medicines list
    const parsedDoctorNotes = 'Parsed Notes'; // Replace with actual parsed data

    // Save to the database
    const prescription = new Prescription({
      doctorName: parsedDoctorName,
      patientName: parsedPatientName,
      date: new Date(),
      medicines: parsedMedicines,
      doctorNotes: parsedDoctorNotes,
      userId,
    });

    await prescription.save();
    res.send('Prescription uploaded and processed');
  } catch (err) {
    res.status(500).send('OCR processing failed');
  }
});

export default router;
