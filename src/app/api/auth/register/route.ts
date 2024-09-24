import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { PoolConnection } from "mysql2/promise";
import { createToken } from "@/util/handleJwt";

const registerQuery = 'INSERT INTO AUTH (EMAIL,PASSWORD) VALUES (?, ?)'; 

export async function PUT(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
        const authSession = request.cookies.get('auth-session-id')?.value;
        const newAccountSession = request.cookies.get('new-account-id')?.value;

        if (!authSession || !newAccountSession) {
            return new Response(JSON.stringify({ msg: "Session expired" }), { status: 403 });
        }

        let userData = await redis.get(`new-user:${newAccountSession}`);
        if (!userData) {
            return new Response(JSON.stringify({ msg: "Session expired" }), { status: 403 });
        }

        let userDataParsed = JSON.parse(userData);
        let password = userDataParsed.password;
        let email = userDataParsed.email;

        connection = await getConnection(DATABASE_INSTANCE);
        await executeQuery(connection, registerQuery, [email, password]);

        const token = await createToken({ email: email }, '7d');

        let response = NextResponse.json(   { msg: "User account created successfully", redirect: "/dashboard" },
            { status: 201 } ) // Set the status code to 201
    
    response.cookies.set('access-token', "Bearer " + token, {
        httpOnly: true,
        maxAge: 3600 * 24 * 7,
        path: '/',
        sameSite: 'strict',
    });
    
    return response;
    
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ msg: "Internal Server Error" }), { status: 500 });
    } finally {
        connection ? connection.release() : null;
    }
}
