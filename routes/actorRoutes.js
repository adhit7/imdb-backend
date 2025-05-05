import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addActor } from '../controllers/actorController.js';
const router = express.Router();

// @desc  Add Actor
router.route('/add').post(protect, addActor);

export default router;
