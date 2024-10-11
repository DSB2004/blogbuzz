"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { ValidateAuth } from "@/lib/validate";
import { v4 } from "uuid";
import { generateOtp } from "@/util/otp.util";
import redis from "@/lib/redis";
import { RedirectType } from "next/navigation";

export default async function ForgetPasswordAction(
  state: any,
  formdata: FormData
) {
  const email = formdata.get("registered-email") as string;
  try {
    // validating a fake password
    const validate = ValidateAuth.safeParse({ email, password: "12345678" });

    if (validate.error) {
      return {
        type: "VALIDATION",
        msg: {
          email: validate.error?.format().email?._errors[0],
        },
      };
    }

    let result = await prisma.auth.findUnique({
      where: {
        email,
      },
    });

    if (!result || result === null) {
      return { type: "ERROR", msg: "Account not found" };
    }

    const otp_session_id = v4();
    const otp = await generateOtp();

    console.log("OTP received:", otp);

    await redis.set(
      `otp-session:${otp_session_id}`,
      JSON.stringify({ otp, mode: "RESET_PASSWORD", email: email }),
      "EX",
      300
    );

    cookies().set("otp-session-id", otp_session_id, {
      httpOnly: true,
      maxAge: 300,
      path: "/",
      sameSite: "strict",
    });
  } catch (err) {
    console.log(err);
    return { type: "ERROR", msg: "Server action error" };
  }
  if (cookies().get("otp-session-id")) {
    redirect(`/auth/otp?user=${email}`);
  } else {
    redirect("/", RedirectType.replace);
  }
}
