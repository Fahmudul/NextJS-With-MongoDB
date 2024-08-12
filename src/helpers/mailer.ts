import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    console.log(email, userId);
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "41c67ef2f18fde",
        pass: "ea732601b1df91",
      },
    });

    const verifyMailOptions = {
      from: "next@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `<p>Click <a href="${
        process.env.NEXT_DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };
    const forgetPasswordMailOptions = {
      from: "next@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      html: `<p>Click <a href="${
        process.env.NEXT_DOMAIN
      }/forgetPassword?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };
    const mailResponse = await transport.sendMail(
      emailType === "VERIFY" ? verifyMailOptions : forgetPasswordMailOptions
    );
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
