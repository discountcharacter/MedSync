import Prescription from '../models/Prescription.js';
import Tesseract from 'tesseract.js';

// Get all prescriptions for the authenticated user
export const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.userId });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prescriptions', error });
  }
};

// Upload and process a prescription
export const uploadPrescription = async (req, res) => {
  try {
    const { userId } = req;
    const imagePath = req.file.path;

    // Process the image using OCR
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

    // Here you need to extract data from the OCR text. For now, you're assigning placeholders.
    const prescription = new Prescription({
      doctorName: 'Parsed Doctor Name', // Replace with actual parsed data
      patientName: 'Parsed Patient Name', // Replace with actual parsed data
      medicines: ['Parsed Medicines'], // Replace with actual parsed data
      doctorNotes: 'Parsed Notes', // Replace with actual parsed data
      userId,
    });
    await prescription.save();

    res.json(prescription);
  } catch (error) {
    res.status(500).json({ message: 'Error processing prescription', error });
  }
};
