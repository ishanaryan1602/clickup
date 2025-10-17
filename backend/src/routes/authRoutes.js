import { Router } from "express";
import { loginController, registerController } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { loginSchema, registerSchema } from "../validations/authValidations.js";

const router = Router();

// login
router.post('/login', validate(loginSchema, 'body'), asyncHandler(loginController));
// register
router.post('/register', validate(registerSchema, 'body'), asyncHandler(registerController));

export const authRoute = router;
