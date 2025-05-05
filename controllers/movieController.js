import asyncHandler from '../middleware/asyncHandler.js';
import Movie from '../models/Movie.js';
import { movieValidationSchema } from '../validation/movieValidation.js';

// @desc    Add new movie
// @route   POST movie/add
// @access  Private
const addMovie = asyncHandler(async (req, res) => {
  const { name, yearOfRelease, plot, poster, producer, actors } = req.body;

  // Validate incoming data using Joi
  const { error } = movieValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400);
    throw new Error(error.details.map((err) => err.message).join(', '));
  }

  const movieExists = await Movie.findOne({ name, yearOfRelease, producer });

  if (movieExists) {
    res.status(400);
    throw new Error('Movie already exists with same name, year and producer');
  }

  const movie = await Movie.create({
    name,
    yearOfRelease,
    plot,
    poster,
    producer,
    actors,
  });

  if (movie) {
    res.json({
      _id: movie._id,
      name: movie.name,
    });
  } else {
    res.status(404);
    throw new Error('Invalid movie data');
  }
});

// @desc    Update movie
// @route   PUT movie/update/${id}
// @access  Private
const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, yearOfRelease, plot, poster, producer, actors } = req.body;

  // Validate incoming data using Joi
  const { error } = movieValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400);
    throw new Error(error.details.map((err) => err.message).join(', '));
  }

  // Check if the movie exists
  let movie = await Movie.findById(id);
  if (!movie) {
    res.status(404);
    throw new Error('Movie not found');
  }

  // Update the movie
  movie = await Movie.findByIdAndUpdate(
    id,
    { name, yearOfRelease, plot, poster, producer, actors },
    { new: true, runValidators: true }
  );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400);
    throw new Error('Failed to update movie');
  }
});

// @desc    Get all movies
// @route   GET /
// @access  Public
const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();

  if (movies) {
    res.json(movies);
  } else {
    res.status(404);
    throw new Error('No movies found');
  }
});

export { addMovie, updateMovie, getAllMovies };
