import mongoose from "mongoose";
import { checkIfUserExists } from "../services/userService.js";
import { verifyJWT } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (typeof token !== "string" || !token.trim()) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }

  let decoded;

  try {
    decoded = verifyJWT(token);

    if (
      typeof decoded !== "object" ||
      !mongoose.isObjectIdOrHexString(decoded.userId)
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  try {
    const user = await checkIfUserExists(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account no longer exists",
      });
    }

    req.user = user;
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to check user",
    });
  }

  next();
};