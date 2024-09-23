import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { createToken } from "@/util/handleJwt";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { PoolConnection } from "mysql";

const loginQuery = 'SELECT * FROM AUTH WHERE EMAIL=?';

export async function POST(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
        const body = await request.json();
        if (!body || !body?.password || !body?.email) {
            return new Response(
                JSON.stringify({ msg: "Email or password is missing" }),
                { status: 400 }
            );
        }

        connection = await getConnection(DATABASE_INSTANCE)
        let result = await executeQuery(connection, loginQuery, [body.email])


        if (!result || result.length < 1) {
            return new Response(
                JSON.stringify({ msg: "Account not found" }),
                { status: 401 }
            );
        }

        // if(result[0]['PASSWORD'])
        const token = await createToken({ email: body.email }, '7d');
        await redis.set("login_account", body.email, 'EX', 3600 * 24 * 7);
        return NextResponse
            .json({ "msg": "User signed in successfully" })
            .cookies.set('access-token', "Bearer " + token, {
                httpOnly: true,
                maxAge: 3600 * 24 * 7,
                path: '/',
                sameSite: 'strict',
            });



    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({ msg: "Internal Server Error" }),
            { status: 500 }
        );

    } finally {
        connection ? connection.release() : null
    }
}