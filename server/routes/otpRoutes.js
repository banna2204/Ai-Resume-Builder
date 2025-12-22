import express from "express";
import { sendOtp } from "../controllers/otpController.js";

const otpRouter = express.Router();

otpRouter.post("/send-otp", sendOtp);

export default otpRouter;
