import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { forgetPasswordToken, userDetails } = reqBody;
    const { password } = userDetails;
    console.log("from line 10", password);
    const user = await User.findOne({
      forgotPasswordToken: forgetPasswordToken,
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log("from line 16", user);
    console.log("from line 17", forgetPasswordToken);
    // new Hashed password
    const newPassword = await bcryptjs.hash(password, 10);
    console.log(newPassword);
    // Update new password in DB
    const updatedUserPassword = await user.updateOne({ password: newPassword });
    console.log(updatedUserPassword);
    return NextResponse.json({
      message: "Password updated successfully",
      status: 200,
      updatedUserPassword,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
