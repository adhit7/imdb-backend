import asyncHandler from '../middleware/asyncHandler.js';
import Actor from '../models/Actor.js';
import { actorValidationSchema } from '../validations/actorValidation.js'; // import validation schema

// @desc    Add new actor
// @route   POST /actors
// @access  Public
const addActor = asyncHandler(async (req, res) => {
  // Validate incoming data using Joi
  const { error } = actorValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message); // Send the error message if validation fails
  }

  const { name, gender, dob, bio } = req.body;

  // Create a new actor in the database
  const actor = await Actor.create({
    name,
    gender,
    dob,
    bio,
  });

  if (actor) {
    res.status(201).json({
      _id: actor._id,
      name: actor.name,
      gender: actor.gender,
      dob: actor.dob,
      bio: actor.bio,
    });
  } else {
    res.status(400);
    throw new Error('Failed to create actor');
  }
});

export { addActor };
