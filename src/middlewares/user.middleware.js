/* eslint-disable import/prefer-default-export */
import Response from '../services/response.service';
import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';

export const checkIfEmailExist = async (req, res, next) => {
	const user = await UserService.findUserByAttribute({ email: req.body.email });
	if (user) {
		Response.errorMessage(409, 'email is already exist');
		return Response.send(res);
	}
	next();
};
export const signinCredentials = async (req, res, next) => {
	const user = await UserService.findUserByAttribute({ email: req.body.email });
	if (!user) {
		Response.errorMessage(400, 'email not registered');
		return Response.send(res);
	}
	const userIsVerified = await UserService.findUserByAttribute({
		email: req.body.email, isVerified: true });
	if (!userIsVerified) {
		Response.errorMessage(401, 'account is not verified');
		return Response.send(res);
	}

	if (!BcryptService.comparePassword(req.body.password, user.password)) {
		Response.errorMessage(401, 'Invalid email or password');
		return Response.send(res);
	}

	next();
};
