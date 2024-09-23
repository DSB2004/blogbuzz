import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { PoolConnection } from "mysql";
import {  hashPassword } from "@/util/handleHashing";
import {v4}  from 'uuid'
import { generateOtp } from "@/util/handleOtp";
 

const newUserquery = 'SELECT * FROM AUTH WHERE EMAIL=?';




export async function POST(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
        const body = await request.json();
    
        if (!body || !body?.password || !body?.email) {
          return new Response(JSON.stringify({ msg: "Email or password is missing" }), { status: 400 });
        }
    
        let password = await hashPassword(body.password);

        connection = await getConnection(DATABASE_INSTANCE);
    
        let result = await executeQuery(connection,  newUserquery, [body.email]);
    
        if (result && result.length > 0) {
          return new Response(JSON.stringify({ msg: "Account already exists" }), { status: 400 });
        }
    
        const otp_session_id = v4();
        const new_account_id = v4();
        const otp = generateOtp();
    
        await redis.set(`otp-session:${otp_session_id}`,JSON.stringify({otp,mode:"NEW_ACCOUNT",email:body.email}),  'EX', 300 );
        await redis.set(`new-user:${new_account_id}`, JSON.stringify({ email: body.email, password }),'EX', 300 );
    
        const response = NextResponse.json({ msg: "OTP has been sent", redirect: `/auth/otp?session=${otp_session_id}` });
        
        response.cookies.set(
            'new-account-id', new_account_id, {
          httpOnly: true,
          maxAge: 300, 
          path: '/',
          sameSite: 'strict',
        });

        response.cookies.set(
            'otp-session-id',otp_session_id, {
          httpOnly: true,
          maxAge: 300, 
          path: '/',
          sameSite: 'strict',
        });
    
    
        return response;
    
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