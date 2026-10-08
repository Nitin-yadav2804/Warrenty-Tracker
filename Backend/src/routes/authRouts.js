import express from "express";
import rateLimit from "express-rate-limit";
import { register, login } from "../controllers/authController.js";


const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { message: "Too many attempts. Try again later." },
});


router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);


export default router;