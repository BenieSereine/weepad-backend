/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import Response from '../services/response.service';
/**
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} validating signup
*/
export const validateSignup = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.string()
			.allow('')
			.trim()
			.strict()
			.min(3)
			.max(30)
			.required()
			.messages({
				'string.empty': 'First name is not allowed to be empty',
				'string.min': 'First name length must be at least 3 characters long',
				'string.max':
          ' First name length must be less than or equal to 30 characters long',
				'any.required': 'First name is required',
				'string.trim':
          'First name must not have white spces at the beginning and at the end',
			}),
		last_name: Joi.string()
			.allow('')
			.trim()
			.strict()
			.min(3)
			.max(30)
			.required()
			.messages({
				'string.empty': 'Last name is not allowed to be empty',
				'string.min': 'Last name length must be at least 3 characters long',
				'string.max':
          ' Last name length must be less than or equal to 30 characters long',
				'any.required': 'Last name is required',
				'string.trim':
          'Last name must not have white spces at the beginning and at the end',
			}),
		email: Joi.string().email().required().messages({
			'string.email': 'Please enter a valid email address',
			'any.required': 'email is required',
			'string.empty': 'email is not allowed to be empty',
		}),
		password: Joi.string()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
			.required()
			.messages({
				'string.pattern.base':
          'password should contain uppercase,lowercase,specialCharacter,and number',
				'any.required': 'password is required',
				'string.empty': 'password is not allowed to be empty',
			}),

		birth_date: Joi.string()
			.regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
			.required()
			.messages({
				'string.pattern.base':
          'birthdate shoul be in the format (yyyy-mm-dd) example:(2017-11-30)',
				'any.required': 'birthdate is required',
				'string.empty': 'birthdate is not allowed to be empty',
			}),
		gender: Joi.any().valid('male', 'female', 'do not prefer to mention').required().messages({
			'string.empty': 'gender is not allowed to be empty',
			'any.required': 'gender is required',
			'any.only': 'gender must be  male or female',
		}),
		location: Joi.string()
			.allow('')
			.trim()
			.strict()
			.min(3)
			.max(15)
			.required()
			.messages({
				'string.min': 'location length must be at least 3 characters long',
				'string.max': 'location length must be less than or equal to 15 characters long',
				'string.empty': 'location is not allowed to be empty',
				'any.required': 'location is required',
				'string.trim': 'location must not have white spces at the beginning and at the end',
			}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);
	if (error) {
		const errors = error.details.map((e) => e.message);
		Response.errorMessage(402, errors);
		return Response.send(res);
	}

	next();
};
export const validateSignin = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			'any.required': 'Email is required',
			'string.email': 'Email must be a valid email',
			'string.empty': 'Email must not be empty'
		}),
		password: Joi.string().required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password must not be empty'
		})
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map(err => err.message);
		Response.errorMessage(422, errors);
		return Response.send(res);
	}
	next();
};
export const validateProfilePage = (req, res, next) => {
	const schema = Joi.object({
		first_name: Joi.string().optional().trim().messages({
			'string.empty': 'First name is not allowed to be empty'
		}),
		last_name: Joi.string().optional().trim().messages({
			'string.empty': 'Last name is not allowed to be empty'
		}),
		gender: Joi.string().optional().trim().messages({
			'string.empty': 'gender is not allowed to be empty'
		}),
		location: Joi.string().optional().trim().messages({
			'string.empty': 'location is not allowed to be empty'
		}),
		birth_date: Joi.string()
			.regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
			.optional()
			.messages({
				'string.pattern.base':
          'birthdate shoul be in the format (yyyy-mm-dd) example:(2017-11-30)',
				'any.required': 'birthdate is required',
				'string.empty': 'birthdate is not allowed to be empty',
			}),
	}).options({ abortEarly: false });
	const { error } = schema.validate(req.body);
	if (error) {
		const errors = error.details.map(err => err.message);
		Response.errorMessage(400, errors);
		return Response.send(res);
	}
	next();
};
export const resetPassword = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
			.required()
			.messages({
				'string.pattern.base': 'password should contain uppercase,lowercase,specialCharacter,and number',
				'any.required': 'password is required',
				'string.empty': 'password is not allowed to be empty'

			}),
		confirmPassword: Joi.any().equal(Joi.ref('password'))
			.required()
			.label('Confirm password')
			.messages({ 'any.only': '{{#label}} does not match' })
	}).options({ abortEarly: false });
	const { error } = schema.validate(req.body);
	if (error) {
		const errors = error.details.map(err => err.message);
		Response.successMessage(400, errors);
		return Response.send(res);
	}
	next();
};
export const sendResetPasswordLink = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			'any.required': 'Email is required',
			'string.email': 'Email must be a valid email',
			'string.empty': 'Email must not be empty'
		}),
	}).options({ abortEarly: false });
	const { error } = schema.validate(req.body);
	if (error) {
		const errors = error.details.map(err => err.message);
		Response.successMessage(400, errors);
		return Response.send(res);
	}
	next();
};
