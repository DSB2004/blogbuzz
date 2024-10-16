"use server";

import { redirect, RedirectType } from "next/navigation";
import { hashPassword } from "@/util/hashing.util";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validate";
import redis from "@/lib/redis";

export default async function ResetPasswordAction(
  state: any,
  formdata: FormData
) {
  try {
    let newPassword = formdata.get("new-password") as string;
    const confirmPassword = formdata.get("confirm-password") as string;
    const authSession = cookies().get("auth-session-id")?.value;
    const userEmail = await redis.get(`auth-session-id:${authSession}`);

    if (!authSession || !userEmail) {
      return {
        type: "ERROR",
        msg: "Session Expired",
      };
    }

    const validate = resetPasswordSchema.safeParse({
      newPassword,
      confirmPassword,
    });

    if (validate.error) {
      return {
        type: "VALIDATION",
        msg: {
          newPassword: validate.error?.format().newPassword?._errors[0],
          copyPassword: validate.error?.format().confirmPassword?._errors[0],
        },
      };
    }

    newPassword = await hashPassword(newPassword);

    await prisma.auth.update({
      data: {
        password: newPassword,
      },
      where: {
        email: userEmail,
      },
    });

    cookies().delete("access-token");
  } catch (err) {
    console.log(err);
    return { type: "ERROR", msg: "Server action error" };
  }
  redirect("/auth/login?success=PASSWORD_RESET", RedirectType.replace);
}
