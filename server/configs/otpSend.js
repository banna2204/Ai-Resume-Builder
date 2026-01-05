import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, otp) => {
  try {
    await sgMail.send({
      to,
      from: process.env.FROM_EMAIL,
      subject: "Your OTP Verification Code",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `
    });
  } catch (err) {
    console.error("SENDGRID ERROR:", err.message);
    throw new Error("Email service failed");
  }
};
