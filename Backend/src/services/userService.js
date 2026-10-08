import { User } from "../models/user.js";

export const checkIfUserExists = async (userId) => {
  return User.findById(userId).select("_id name email");
};