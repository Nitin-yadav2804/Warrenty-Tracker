import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createDevice,
  getDevices,
  updateDevice,
  deleteDevice,
} from "../controllers/deviceController.js";

const router = Router();


router.use(isAuthenticated);

router.post("/", createDevice);
router.get("/", getDevices);
router.patch("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;