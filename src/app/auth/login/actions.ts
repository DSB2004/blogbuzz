"use server";

import { redirect } from "next/navigation";
import { comparePassword } from "@/util/hashing.util";
import { createToken } from "@/util/jwt.util";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { ValidateAuth } from "@/lib/validate";

export default async function LoginAction(state: any, formdata: FormData) {
  try {
    const email = formdata.get("login-email") as string;
    const password = formdata.get("login-password") as string;

    const validate = ValidateAuth.safeParse({
      name: "john doe",
      email,
      password,
    });

    if (validate.error) {
      return {
        type: "VALIDATION",
        msg: {
          email: validate.error?.format().email?._errors[0],
          password: validate.error?.format().password?._errors[0],
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

    const isAuthorised = await comparePassword(result.password, password);

    if (!isAuthorised) {
      return { type: "ERROR", msg: "Password didn't matched" };
    }

    const token = await createToken({ email, name: result.name }, "7d");

    cookies().set("access-token", token, {
      httpOnly: true,
      maxAge: 300,
      path: "/",
      sameSite: "strict",
    });
  } catch (err) {
    console.log(err);
    return { type: "ERROR", msg: "Server action error" };
  }
  if (cookies().get("access-token")) {
    redirect("/dashboard");
  } else {
    redirect("/");
  }
}
