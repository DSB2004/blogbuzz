import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { firebaseStorage } from "@/lib/firebase";
import { PoolConnection } from "mysql2/promise";

const deleteAccountQuery = 'DELETE FROM AUTH WHERE EMAIL=?;';
const deleteUserQuery = 'DELETE FROM USER WHERE EMAIL=?;';
const deleteSocialLinksQuery = 'DELETE FROM SOCIAL_LINKS WHERE USER_EMAIL=?;';

export async function DELETE(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
        const authSession = request.cookies.get('auth-session-id')?.value;

        if (!authSession) {
            return new Response(JSON.stringify({ msg: "Session expired" }), { status: 403 });
        }

        const userEmail = await redis.get(`auth-session-id:${authSession}`);
        if (!userEmail) {
            return new Response(JSON.stringify({ msg: "Session expired" }), { status: 403 });
        }

        connection = await getConnection(DATABASE_INSTANCE);

        await connection.beginTransaction();
        await executeQuery(connection, deleteSocialLinksQuery, [userEmail]);
        await executeQuery(connection, deleteUserQuery, [userEmail]);

        try{
            await firebaseStorage.bucket().file(userEmail).delete();
        }catch(err){
            //  user didnt stored anything on cloud
        }

        await executeQuery(connection, deleteAccountQuery, [userEmail]);
        await connection.commit();

        const response = NextResponse.json({ msg: "User account deleted successfully" }, { status: 410 });
        response.cookies.delete('access-token');
        return response;

    } catch (error) {
        await connection?.rollback()
        console.error('Error:', error);
        if (connection) await connection.rollback();
        return new Response(JSON.stringify({ msg: "Internal Server Error" }), { status: 500 });
    } finally {
        if (connection) connection.release(); 
    }
}
