import { Router } from "express";
const router = Router();
import * as userController from "../controllers/userControllers.js"
import * as authentication from '../controllers/authControllers.js'

router.post('/signup', authentication.signup);
router.post('/login', authentication.login);
router.post('/forgotPassword', authentication.forgotPassword);
router.post('/resetPassword/:token', authentication.resetPassword);
router.post('/check-authentication/:jwtToken', authentication.isLoggedIn);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)

export default router;