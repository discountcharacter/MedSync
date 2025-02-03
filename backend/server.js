import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import multer from 'multer';

dotenv.config(); // Ensure this is here to load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://med-sync-seven.vercel.app', // Frontend URL
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection (Ensure your MongoDB URI is correct)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
