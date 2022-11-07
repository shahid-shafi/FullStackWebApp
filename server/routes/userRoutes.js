import express from "express";
const router = express.Router();
import * as authentication from '../controllers/authControllers.js'

router.post('/signup', authentication.signup);
router.post('/login', authentication.login);
router.post('/forgotPassword', authentication.forgotPassword);
router.post('/resetPassword/:token', authentication.resetPassword);

export default router;