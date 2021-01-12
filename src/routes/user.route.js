import { Router } from 'express';
import UserController from '../controllers/user.controller';
import protectRoute from '../middlewares/protect-route.middleware';
import { validateProfilePage } from '../validations/user.validation';

const router = Router();

router.patch('/profile', protectRoute, validateProfilePage, UserController.updateProfileUser);
router.get('/profile', protectRoute, UserController.getSpecificUser);

export default router;
