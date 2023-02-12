import express from "express";
import { registerUser } from "../controllers/userController.js";

export const router = express.Router();

//Register a user
router.route("/register").post(registerUser);
