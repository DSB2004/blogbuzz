"use server";

import redis from "@/lib/redis";
import { v4 } from "uuid";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyOtp } from "@/util/otp.util";
import { RedirectType } from "next/navigation";

export default async function OTPAction(state: any, formData: FormData) {
  let userOtp = formData.get("otp") as string;

  if (!userOtp) {
    return { type: "ERROR", msg: "OTP rquired" };
  }
  const otpSession = cookies().get("otp-session-id")?.value;

  if (!otpSession) {
    return { type: "ERROR", msg: "Session expired" };
  }

  const otpSessionContent = await redis.get(`otp-session:${otpSession}`);
  if (!otpSessionContent) {
    return { type: "ERROR", msg: "Session expired" };
  }

  try {
    console.log(JSON.parse(otpSessionContent));
    const { otp, mode, email } = JSON.parse(otpSessionContent);

    if (userOtp !== otp || !verifyOtp(otp)) {
      return { type: "ERROR", msg: "Incorrect OTP" };
    }

    cookies().delete("otp-session-id");
    await redis.del(`otp-session:${otpSession}`);

    const auth_session_id = v4();
    await redis.set(`auth-session-id:${auth_session_id}`, email, "EX", 300);
    cookies().set("auth-session-id", auth_session_id, {
      httpOnly: true,
      maxAge: 300,
      path: "/",
      sameSite: "strict",
    });
    cookies().set("auth-session-mode:${auth_session_id}", mode);
  } catch (err) {
    return {
      type: "ERROR",
      msg: "Server action error",
    };
  }

  const mode = cookies().get("auth-session-mode:${auth_session_id}")?.value;
  cookies().delete("auth-session-mode:${auth_session_id}");

  if (mode === "NEW_ACCOUNT") {
    redirect("/auth/register", RedirectType.replace);
  } else if (mode === "RESET_PASSWORD") {
    redirect("/auth/reset-password", RedirectType.replace);
  } else if (mode === "DELETE_ACCOUNT") {
    redirect("/auth/delete-account", RedirectType.replace);
  } else {
    redirect("/unauthorized", RedirectType.replace);
  }
}
