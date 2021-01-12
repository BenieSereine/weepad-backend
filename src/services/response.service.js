/**
 * ResponseService class
 */
class Response {
	/**
   * @param {number} statusCode
   * @param {string} message
   * @param {object} data
   * @return {object} setting the success message
   */
	static successMessage(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	/**
   * @param {number} statusCode
   * @param {string} message
   * @return {object} setting the error message
   */
	static errorMessage(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'error';
	}

	/**
   * @param {object} res
   * @return {object} this is a send response service
   */
	static send(res) {
		if (this.type === 'success') {
			return res.status(this.statusCode).json({
				status: this.statusCode,
				message: this.message,
				data: this.data,
			});
		}
		return res.status(this.statusCode).json({
			status: this.statusCode,
			message: this.message,
		});
	}
}
export default Response;
