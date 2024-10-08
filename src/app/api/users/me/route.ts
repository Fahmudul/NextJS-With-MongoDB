import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  const userId = await getDataFromToken(request);
  try {
    await connect();
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ data: user, message: "User found" });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
