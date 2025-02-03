const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const Prescription = require('../models/Prescription');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('prescription'), async (req, res) => {
  const { userId } = req.body;
  const imagePath = req.file.path;

  Tesseract.recognize(imagePath, 'eng')
    .then(({ data: { text } }) => {
      // Parse text and save to database
      const prescription = new Prescription({
        doctorName: 'Parsed Doctor Name',
        patientName: 'Parsed Patient Name',
        date: new Date(),
        medicines: ['Parsed Medicines'],
        doctorNotes: 'Parsed Notes',
        userId,
      });
      prescription.save();
      res.send('Prescription uploaded and processed');
    })
    .catch((err) => res.status(500).send('OCR processing failed'));
});

module.exports = router;