import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, otp) => {
  const userName = to.split("@")[0];
  const formattedName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  await sgMail.send({
    to,
    from: {
      email: process.env.FROM_EMAIL,
      name: "Resume Builder"
    },
    subject: "Your Resume Builder OTP (Valid for 5 minutes)",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color:#22c55e;">Verify your email</h2>

        <p>Hello <strong>${formattedName}</strong>,</p>

        <p>Your One-Time Password (OTP) for Resume Builder is:</p>

        <div style="
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 4px;
          background: #f0fdf4;
          padding: 12px 20px;
          display: inline-block;
          border-radius: 6px;
          margin: 10px 0;
          color: #166534;
        ">
          ${otp}
        </div>

        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>

        <hr />
        <p style="font-size:12px;color:#777;">
          This email was sent by Resume Builder.
        </p>
      </div>
    `
  });
};
