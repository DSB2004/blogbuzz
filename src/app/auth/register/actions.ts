"use server";
import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createToken } from "@/util/jwt.util";

export default async function RegisterAction(state: any, formData: FormData) {
  try {
    const acceptance = formData.get("accept");
    if (!acceptance) {
      return {
        type: "ERROR",
        msg: "Accept Terms and Conditions",
      };
    }

    const newAccountSession = cookies().get("new-account-id")?.value;
    const authSession = cookies().get("auth-session-id")?.value;

    if (!authSession || !newAccountSession) {
      return {
        type: "ERROR",
        msg: "Session Expired",
      };
    }

    let userData = await redis.get(`new-user:${newAccountSession}`);
    if (!userData) {
      return {
        type: "ERROR",
        msg: "Session Expired",
      };
    }
    const { email, name, password } = JSON.parse(userData);

    await prisma.auth.create({
      data: { email, password, name },
    });

    cookies().delete("auth-session-id");
    cookies().delete("new-account-id");

    const token = await createToken({ email: email }, "7d");

    cookies().set("access-token", token, {
      httpOnly: true,
      maxAge: 3600 * 24 * 7,
      path: "/",
      sameSite: "strict",
    });
  } catch (err) {
    return {
      type: "ERROR",
      msg: "Session Expired",
    };
  }

  if (cookies().get("access-token")) {
    redirect("/dashboard");
  } else {
    redirect("/");
  }
}
