import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addProducer } from '../controllers/producerController.js';
const router = express.Router();

// @desc  Add Producer
router.route('/add').post(protect, addProducer);

export default router;
