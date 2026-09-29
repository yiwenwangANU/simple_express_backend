import { Router } from "express";
import { login, logout, register } from "../controllers/authController";
import createValidatorMiddleware from "../middleware/createValidatorMiddleware";
import { loginSchema, registerSchema } from "../validators/authValidator";

const router = Router();

router.post("/register", createValidatorMiddleware(registerSchema), register);
router.post("/login", createValidatorMiddleware(loginSchema), login);
router.post("/logout", logout);

export default router;
