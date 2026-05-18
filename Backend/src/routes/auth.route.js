import { Router } from "express";
import { register,login, getMe, verifyEmail, logout } from "../controllers/auth.controller.js";
import {registerValidation, loginValidation} from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();
/** 
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {email, username, password}
 */
authRouter.post('/register', registerValidation, register);


/** 
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @body {email, password}
 */
authRouter.post('/login', loginValidation, login);

/** 
 * @route GET /api/auth/verify-email
 * @desc Verify email
 * @access Public
 * @query {token}
 */
authRouter.get('/verify-email', verifyEmail);

/** 
 * @route GET /api/auth/me
 * @desc Get current user
 * @access Private
 */
authRouter.get('/get-me', authUser, getMe);

/** 
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Private
 */
authRouter.post('/logout', authUser, logout);

export default authRouter;