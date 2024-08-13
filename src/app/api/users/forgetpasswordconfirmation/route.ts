import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { forgetPasswordToken, userDetails } = reqBody;
    const { password } = userDetails;
    const user = await User.findOne({
      forgotPasswordToken: forgetPasswordToken,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    // new Hashed password
    const newPassword = await bcryptjs.hash(password, 10);
    // Update new password in DB
    const updatedUserPassword = await user.updateOne({ password: newPassword });
    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
      updatedUserPassword,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
