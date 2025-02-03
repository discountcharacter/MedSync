import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import ocrRoutes from './routes/ocr.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://med-sync-seven.vercel.app', // Your frontend URL
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ocr', ocrRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
