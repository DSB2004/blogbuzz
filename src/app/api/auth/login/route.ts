

import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { createToken } from "@/util/handleJwt";
import { NextRequest, NextResponse } from "next/server";
import { PoolConnection } from "mysql2/promise";
import { comparePassword } from "@/util/handleHashing";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginQuery = 'SELECT * FROM AUTH WHERE EMAIL=?';

export async function POST(request: NextRequest) {

    let connection: PoolConnection | undefined;
    try {
        const body = await request.json();
        if (!body || !body.password || !body.email) {
            return new Response(
                JSON.stringify({ msg: "Email or password is missing" }),
                { status: 400 }
            );
        }

        connection = await getConnection(DATABASE_INSTANCE);
        let result = await executeQuery(connection, loginQuery, [body.email]);

        if (!result || result.length < 1) {
            return new Response(
                JSON.stringify({ msg: "Account not found" }),
                { status: 401 }
            );
        }

        const isAuthorised = await comparePassword(result[0]['PASSWORD'], body.password);

        if (!isAuthorised) {
            return new Response(
                JSON.stringify({ msg: "Password didn't match" }),
                { status: 401 }
            );
        }

        const token = await createToken({ email: body.email }, '7d');

        cookies().set('access-token', "Bearer " + token, {
            httpOnly: true,
            maxAge: 3600 * 24 * 7,  // 7 days
            path: '/',
            sameSite: 'strict',
        });

        // redirect(new URL('/dashboard', request.nextUrl))
        // return NextResponse.json({ msg: "user logged in" })
        // return NextResponse.redirect(new URL('/dashboard', request.nextUrl))

    } catch (error) {
        console.error('Error happended:', error);
        return new Response(
            JSON.stringify({ msg: "Internal Server Error" }),
            { status: 500 }
        );
    } finally {

    }
}
