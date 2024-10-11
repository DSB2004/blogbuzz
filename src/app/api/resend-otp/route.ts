import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { cookies } from "next/headers";
import { generateOtp } from "@/util/otp.util";

export async function GET() {
  try {
    const otpSession = cookies().get("otp-session-id")?.value;

    const otpSessionContent = await redis.get(`otp-session:${otpSession}`);
    if (!otpSessionContent) {
      return NextResponse.json({ msg: "Session expired" }, { status: 403 });
    }

    const { mode, email } = JSON.parse(otpSessionContent);

    const newOtp = await generateOtp();

    await redis.set(
      `otp-session:${otpSession}`,
      JSON.stringify({ mode, email, otp: newOtp }),
      "EX",
      300
    );

    return NextResponse.json({ msg: "New otp sent" });
  } catch (err) {
    return NextResponse.json({ msg: "Server side error" }, { status: 500 });
  }
}
