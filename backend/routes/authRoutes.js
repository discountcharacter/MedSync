import express from 'express';

const router = express.Router();

// Simple auth route
router.get('/', (req, res) => {
  res.send('Auth route is working');
});

export default router;
