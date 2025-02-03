import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  patientName: { type: String, required: true },
  date: { type: Date, required: true },
  medicines: [{ type: String }],
  doctorNotes: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Prescription', prescriptionSchema);
