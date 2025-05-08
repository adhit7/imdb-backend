import Joi from 'joi';

const movieValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Movie name must be a string',
    'any.required': 'Movie name is required',
  }),
  yearOfRelease: Joi.string()
    .pattern(/^\d{4}$/, 'Year must be in YYYY format')
    .required()
    .messages({
      'string.base': 'Year of release must be a string',
      'string.pattern.base': 'Year of release must be in YYYY format',
      'any.required': 'Year of release is required',
    }),
  plot: Joi.string().required().messages({
    'string.base': 'Plot must be a string',
    'any.required': 'Plot is required',
  }),
  poster: Joi.string().uri().required().messages({
    'string.base': 'Poster URL must be a string',
    'string.uri': 'Poster URL must be a valid URL',
    'any.required': 'Poster URL is required',
  }),
  producer: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/, 'Producer ID must be a valid Mongo ObjectId')
    .required()
    .messages({
      'string.base': 'Producer ID must be a string',
      'string.pattern.base': 'Producer ID must be a valid Mongo ObjectId',
      'any.required': 'Producer ID is required',
    }),
  actors: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/, 'Actor ID must be a valid Mongo ObjectId')
        .messages({
          'string.base': 'Each actor ID must be a string',
          'string.pattern.base': 'Actor ID must be a valid Mongo ObjectId',
        })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Actors must be an array of strings',
      'array.min': 'At least one actor is required',
      'any.required': 'Actors are required',
    }),
});

export { movieValidationSchema };
