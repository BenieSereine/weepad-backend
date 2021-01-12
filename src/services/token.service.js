import jwt from 'jsonwebtoken';

/**
 * This is a service that is dealing with token encoding and decoding
 */
class TokenService {
	/**
   * @param {object} payload
   * @return {object} this is accept a payload and generate a jwt token
   */
	static generateToken(payload) {
		return jwt.sign(payload, process.env.SECRET, {
			expiresIn: process.env.EXPIRE_TIME,
		});
	}

	/**
   * @param {object} token
   * @return {object} this is accept a token and decode it according to the secret
   */
	static verifyToken(token) {
		return jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				return err;
			}
			return decoded;
		});
	}
}

export default TokenService;
