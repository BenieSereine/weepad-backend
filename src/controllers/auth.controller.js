import bcrypt from 'bcrypt';
import Response from '../services/response.service';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';
import BcryptService from '../services/bcrypt.service';
import MailService from '../services/mail.service';

/**
 * AuthController class
*/
class AuthController {
	/**
     * @param {Object} req
     * @param {Object} res
     * @return {Object} This is the user signup
     * */
	static async signup(req, res) {
		const hash = bcrypt.hashSync(req.body.password, 10);
		const user = await UserService.createUser({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: hash,
			gender: req.body.gender,
			birth_date: req.body.birth_date,
			location: req.body.location
		});
		const data = {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			gender: user.gender,
			birth_date: user.birth_date,
			isVerified: user.isVerified,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
		Response.successMessage(201, 'User is now signed up', {
			user: data,
			token: TokenService.generateToken(data),
		});
		return Response.send(res);
	}

	/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} sign in with email and password
*/
	static async signin(req, res) {
		const user = await UserService.findUserByAttribute({ email: req.body.email });
		const userData = { ...user.dataValues };
		delete userData.password;
		Response.successMessage(200, 'successfully logged in', {
			token: TokenService.generateToken(userData),
		});
		return Response.send(res);
	}

	/**
 * @param {object} req
 * @param {object} res
 * @returns {object} reset password
*/
	static async resetPassword(req, res) {
		const bearerHeader = req.headers.authorization;
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		const decodedToken = await TokenService.verifyToken(bearerToken);
		await UserService.updateUserByAttribute({ email: decodedToken.email }, {
			password: BcryptService.hashPassword(req.body.password),
			confirmPassword: BcryptService.hashPassword(req.body.confirmPassword)
		});
		if (req.body.password !== req.body.confirmPassword) {
			Response.successMessage(400, 'Password does not match!');
			return Response.send(res);
		}
		Response.successMessage(200, 'Password changed successfully');
		return Response.send(res);
	}

	/**
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} helping the user to reset the password
	*/
	static async forgetPassword(req, res) {
		const decodedToken = await TokenService.verifyToken(req.query.token);
		UserService.updateUserByAttribute({ email: decodedToken.email }, { isVerified: true });
		Response.successMessage(200, 'Type http://localhost:3000/api/auth/resetpassword in the postman to change the password');
		return Response.send(res);
	}

	/**
 * @param {object} req
 * @param {object} res
 * @returns {object} sends the link to the email that helps the user to reset the password
*/
	static async sendResetPasswordLink(req, res) {
		const result = await UserService.findUserByAttribute({ email: req.body.email });
		if (result !== null) {
			const token = TokenService.generateToken({ email: req.body.email });
			MailService.sendEMail(result.dataValues.first_name, result.dataValues.email, token);
			Response.successMessage(200, 'Email sent, please check your email to reset your password', token);
			return Response.send(res);
		}
		Response.errorMessage(404, 'user not found!');
		return Response.send(res);
	}

	/**
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} logout a user
*/
	static async logoutUser(req, res) {
		const { id } = req.body;
		await UserService.updateUserByAttribute({ logoutTime: new Date() }, id);
		Response.successMessage(200, 'logged out successfully');
		return Response.send(res);
	}
}

export default AuthController;
