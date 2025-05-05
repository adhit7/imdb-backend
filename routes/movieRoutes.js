import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addMovie,
  updateMovie,
  getAllMovies,
} from '../controllers/movieController.js';
const router = express.Router();

// @desc  Get All Movie
router.get('/', getAllMovies);

// @desc  Add New Movie
router.route('/add').post(protect, addMovie);

// @desc  Update Movie
router.route('/update/:id').put(protect, updateMovie);

export default router;
