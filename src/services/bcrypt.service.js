import bcrypt from 'bcrypt';

/**
 * This is a class for encrypting and decrypting password
 */
class BcryptService {
	/**
   * @param {string} password
   * @returns {object} This returns an encrypted password
   */
	static hashPassword(password) {
		return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
	}

	/**
   * @param {string} plainPwd
   * @param {string} hashedPwd
   * @returns {object} This returns an dencrypted password
   */
	static comparePassword(plainPwd, hashedPwd) {
		return bcrypt.compareSync(plainPwd, hashedPwd);
	}
}

export default BcryptService;
