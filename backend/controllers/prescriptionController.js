const Prescription = require('../models/Prescription');
const Tesseract = require('tesseract.js');

// Get all prescriptions for the authenticated user
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.userId });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error });
  }
};

// Upload and process a prescription
exports.uploadPrescription = async (req, res) => {
  try {
    const { userId } = req;
    const imagePath = req.file.path;

    // Process the image using OCR
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

    // Save the parsed data to the database
    const prescription = new Prescription({
      doctorName: 'Parsed Doctor Name', // Replace with actual parsed data
      patientName: 'Parsed Patient Name', // Replace with actual parsed data
      medicines: ['Parsed Medicines'], // Replace with actual parsed data
      notes: 'Parsed Notes', // Replace with actual parsed data
      userId,
    });
    await prescription.save();

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error processing prescription', error });
  }
};