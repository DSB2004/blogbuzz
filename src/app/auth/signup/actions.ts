"use server"

import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { hashPassword } from "@/util/hashing.util";
import { v4 } from 'uuid';
import { generateOtp } from "@/util/otp.util";
import { ValidateAuth } from "@/lib/validate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default async function SignUpAction(state: any, formData: FormData) {
    let email = formData.get('register-email') as string;
    let password = formData.get('register-password') as string;

    const validate = ValidateAuth.safeParse({
        email,
        password
    });

    if (validate.error) {
        return {
            type: "VALIDATION",
            msg: {
                email: validate.error?.format().email?._errors[0],
                password: validate.error?.format().password?._errors[0]
            }
        }
    }


    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (user) {
            return { type: "ERROR", msg: "Account already exist" }
        }

        const new_account_id = v4();
        const otp_session_id = v4();
        const otp = await generateOtp();

        console.log("OTP received:", otp)

        password = await hashPassword(password);

        await redis.set(`otp-session:${otp_session_id}`, JSON.stringify({ otp, mode: "NEW_ACCOUNT", email: email }), 'EX', 300);
        await redis.set(`new-user:${new_account_id}`, JSON.stringify({ email: email, password }), 'EX', 300);

        cookies().set('new-account-id', new_account_id, { httpOnly: true, maxAge: 300, path: '/', sameSite: 'strict' });
        cookies().set('otp-session-id', otp_session_id, { httpOnly: true, maxAge: 300, path: '/', sameSite: 'strict' });

    } catch (err) {
        console.log(err);
        return { type: "ERROR", msg: "Server side error" }


    }
    if (cookies().get('new-account-id') && cookies().get('otp-session-id')) {
        redirect(`/auth/otp`)
    }
    else {
        redirect("/")
    }
}
