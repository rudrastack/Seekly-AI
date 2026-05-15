import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import {registerValidation} from "../validators/auth.validator.js";

const authRouter = Router();
/** 
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {email, username, password}
 */
authRouter.post('/register', registerValidation, register);

export default authRouter;