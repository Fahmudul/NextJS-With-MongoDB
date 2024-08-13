import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

async function getCookieData(): Promise<string> {
  const cookieData = cookies().get("token")?.value || "";
  // console.log(cookieData);
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}
export const getDataFromToken = async (request: NextRequest) => {
  try {
    getCookieData();
    const token = await getCookieData();
    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    if (isDynamicServerError(error)) {
      throw error;
    }
  }
};
