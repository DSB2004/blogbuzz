import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { PoolConnection } from "mysql";

const deleteAccountQuery = 'DELETE FROM AUTH WHERE EMAIL=?;'; 

export async function DELETE(request: NextRequest) {
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


        connection = await getConnection(DATABASE_INSTANCE);
        await executeQuery(connection, deleteAccountQuery, [userEmail]);


        let response;
        response=NextResponse.json({ msg: "User account deleted successfully", redirect: "/" },{status:204})
        response.cookies.delete('access-token');
        return response;

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ msg: "Internal Server Error" }), { status: 500 });
    } finally {
        connection ? connection.release() : null;
    }
}
