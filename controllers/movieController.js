import asyncHandler from '../middleware/asyncHandler.js';
import Movie from '../models/Movie.js';
import Producer from '../models/Producer.js';
import Actor from '../models/Actor.js';
import { movieValidationSchema } from '../validations/movieValidation.js';

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

  // Check if producer exists in DB
  const existingProducer = await Producer.findById(producer);
  if (!existingProducer) {
    res.status(400);
    throw new Error('Producer not found');
  }

  // Check if all actors exist in DB
  const existingActors = await Actor.find({ _id: { $in: actors } });
  if (existingActors.length !== actors.length) {
    res.status(400);
    throw new Error('One or more actor IDs are invalid');
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
      yearOfRelease: movie.yearOfRelease,
      plot: movie.plot,
      poster: movie.poster,
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
    abortEarly: false, // Validate all errors at once
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

  // Update the movie using findByIdAndUpdate
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
