import Joi from 'joi';

const producerValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Producer name must be a string',
    'any.required': 'Producer name is required',
  }),
  gender: Joi.string().optional().messages({
    'string.base': 'Gender must be a string',
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is required',
  }),
  bio: Joi.string().required().max(500).messages({
    'string.base': 'Bio must be a string',
    'any.required': 'Bio is required',
    'string.max': 'Bio cannot exceed 500 characters',
  }),
});

export { producerValidationSchema };
