import { sendEmail } from "../configs/otpSend.js";
import Otp from "../models/otp.js";

export const sendOtp = async (req, res) => {
  try {
    const {name, email } = req.body;
    if (!email || !name) {
      return res.status(400).json({ message: "Fields required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.findOneAndUpdate(
      { email },
      {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000
      },
      { upsert: true, new: true }
    );
    console.log("FROM_EMAIL:", process.env.FROM_EMAIL);
    console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "SET" : "NOT SET");

    await sendEmail(name,email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
