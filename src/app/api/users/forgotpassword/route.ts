import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const requestBody = await request.json();
    const { email } = requestBody;
    console.log(email);
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log(user);
    const response = await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });
    return NextResponse.json({
      response,
      status: 200,
      message: "Forget password Email sent",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
