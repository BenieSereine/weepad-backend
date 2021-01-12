import Response from '../services/response.service';
import UserService from '../services/user.service';

/**
 * user controller class
 *  */
class UserController {
	/**
	 *
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} get a specific user from the database
	 */
	static async getSpecificUser(req, res) {
		const userProfile = await UserService.findUserByAttribute({ id: req.userData.id });
		const userData = {
			id: userProfile.id,
			first_name: userProfile.first_name,
			last_name: userProfile.last_name,
			email: userProfile.email,
			gender: userProfile.gender,
			birth_date: userProfile.birth_date,
			isVerified: userProfile.isVerified,
			createdAt: userProfile.createdAt,
			updatedAt: userProfile.updatedAt,
		};
		Response.successMessage(200, 'User information', userData);
		return Response.send(res);
	}

	/**
 * @param {object} req
 * @param {object} res
 * @returns {object} update a specific user
*/
	static async updateProfileUser(req, res) {
		await UserService.updateUserByAttribute({ id: req.userData.id }, {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			gender: req.body.gender,
			location: req.body.location,
			birth_date: req.body.birth_date
		});
		const findUser = await UserService.findUserByAttribute({ id: req.userData.id });
		Response.successMessage(200, 'Profile Page updated successfully', {
			id: findUser.id,
			first_name: findUser.first_name,
			last_name: findUser.last_name,
			email: findUser.email,
			gender: findUser.gender,
			birth_date: findUser.birth_date,
			isVerified: findUser.isVerified,
			createdAt: findUser.createdAt,
			updatedAt: findUser.updatedAt
		});
		return Response.send(res);
	}
}

export default UserController;
