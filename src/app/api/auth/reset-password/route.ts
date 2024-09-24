import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { PoolConnection } from "mysql2/promise";
import { hashPassword } from "@/util/handleHashing";

const updatePasswordQuery = 'UPDATE AUTH SET PASSWORD=? WHERE EMAIL=?;'; 

export async function PATCH(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
        
        
        const authSession = request.cookies.get('auth-session-id')?.value;
        
        if (!authSession) {
            return new Response(JSON.stringify({ msg: "Session expired" }), { status: 403 });
        }
        
        let userEmail = await redis.get(`auth-session-id:${authSession}`);
        if (!userEmail) {
            return new Response(JSON.stringify({ msg: "Session expired" }), { status: 403 });
        }
        
        let body=await request.json();
        let password=body.password;

        if(!password){
            return new Response(JSON.stringify({ msg: "Password required" }), { status: 400 });
        }
        let hashedPassword=await hashPassword(password);
        
        connection = await getConnection(DATABASE_INSTANCE);
        await executeQuery(connection, updatePasswordQuery, [hashedPassword,userEmail]);

        let response;
        response=NextResponse.json({ msg: "User password updated successfully", redirect: "/auth/login" },{status:200})
        return response;

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ msg: "Internal Server Error" }), { status: 500 });
    } finally {
        connection ? connection.release() : null;
    }
}
