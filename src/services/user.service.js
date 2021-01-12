import models from '../database/models';

const { user } = models;

/**
 * this is a user service
 */
class UserService {
	/**
   * @param {object} User
   * @return {object} this is a service for creating a user
   */
	static async createUser(User) {
		return user.create(User);
	}

	/**
	   * @param {object} attribute
	   * @param {object} property
	   * @return {object} update user by attribute
	   */
	static async updateUserByAttribute(attribute, property) {
		return user.update(property, { where: attribute });
	}

	/**
   * @param {object} attribute
   * @returns {object} getting a user that is already logged in
   */
	static async findUserByAttribute(attribute) {
		return user.findOne({ where: attribute });
	}

	// 	/**
	//    * @param {string} instance
	//    * @param {object} property
	//    * @returns {object} this update a given user
	//    */
	// 	static updateProperty(instance, property) {
	// 		return User.update(property, { where: instance });
	// 	}

// 	/**
//    *
//    * @param {object} property
//    * @param {object} property1
//    * @returns {object} this return a given user based by property
//    */
// 	static findUserByProperty(property) {
// 		return User.findOne({ where: property });
// 	}
}
export default UserService;
