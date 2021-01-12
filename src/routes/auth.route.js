import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validateSignup, validateSignin, resetPassword, sendResetPasswordLink } from '../validations/user.validation';
import { signinCredentials, checkIfEmailExist } from '../middlewares/user.middleware';
import protectRoute from '../middlewares/protect-route.middleware';

const router = Router();

router.post(
	'/signup',
	checkIfEmailExist,
	validateSignup,
	AuthController.signup
);
router.post(
	'/signin',
	validateSignin,
	signinCredentials,
	AuthController.signin
);

router.patch('/reset-password', protectRoute, resetPassword, AuthController.resetPassword);
router.post('/forget-password', sendResetPasswordLink, AuthController.sendResetPasswordLink);
router.get('/resetpassword', AuthController.forgetPassword);

router.patch(
	'/logout',
	protectRoute,
	AuthController.logoutUser
);
export default router;
