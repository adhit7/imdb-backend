import asyncHandler from '../middleware/asyncHandler.js';
import Producer from '../models/Producer.js';
import { producerValidationSchema } from '../validation/producerValidation.js'; // import validation schema

// @desc    Add new producer
// @route   POST /add
// @access  Public
const addProducer = asyncHandler(async (req, res) => {
  // Validate incoming data using Joi
  const { error } = producerValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message); // Send the error message if validation fails
  }

  const { name, gender, dob, bio } = req.body;

  // Create a new producer in the database
  const producer = await Producer.create({
    name,
    gender,
    dob,
    bio,
  });

  if (producer) {
    res.status(201).json({
      _id: producer._id,
      name: producer.name,
      gender: producer.gender,
      dob: producer.dob,
      bio: producer.bio,
    });
  } else {
    res.status(400);
    throw new Error('Failed to create producer');
  }
});

export { addProducer };
