export const dynamic = 'force-dynamic';

import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { PoolConnection } from "mysql";
import {v4}  from 'uuid'
import { generateOtp } from "@/util/handleOtp";
 

const deleteAccountQuery = 'SELECT * FROM AUTH WHERE EMAIL=?';




export async function GET(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {

        const userEmail = request.nextUrl.searchParams.get('email');
       

        connection = await getConnection(DATABASE_INSTANCE);
    
        let result = await executeQuery(connection,  deleteAccountQuery, [userEmail]);
    
        if (!result || result.length < 1) {
            return new Response(
                JSON.stringify({ msg: "Account not found" }),
                { status: 401 }
            );
        }

    
        const otp_session_id = v4();
        const otp = generateOtp();
    
        await redis.set(`otp-session:${otp_session_id}`,JSON.stringify({otp,mode:"RESET_PASSWORD",email:userEmail}),  'EX', 300 );
        const response = NextResponse.json({ msg: "OTP has been sent", redirect: `/auth/otp?session=${otp_session_id}` });
        
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