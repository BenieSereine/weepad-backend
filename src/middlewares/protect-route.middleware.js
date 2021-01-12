import Response from '../services/response.service';
import TokenService from '../services/token.service';

const protectRoute = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		const { name } = TokenService.verifyToken(req.token);
		if (name === 'JsonWebTokenError') {
			Response.errorMessage(401, 'Unauthorized, invalid token');
			return Response.send(res);
		}
		if (name === 'TokenExpiredError') {
			Response.errorMessage(
				401,
				'Unauthorized, Token has expired signin again to get new token',
			);
			return Response.send(res);
		}
		req.userData = TokenService.verifyToken(req.token);
		next();
	} else {
		Response.errorMessage(
			403,
			'You can not proceed without setting authorization token',
		);
		return Response.send(res);
	}
};

export default protectRoute;
