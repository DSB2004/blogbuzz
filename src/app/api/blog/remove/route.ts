import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { NextRequest, NextResponse } from "next/server";
import { firebaseStorage } from "@/lib/firebase";
import { PoolConnection } from "mysql2/promise";
import { checkOwnership, getUser } from "@/util/handleUser";

const deleteBlogQuery = 'DELETE FROM BLOG WHERE ID=?;';
const deleteTagsQuery = 'DELETE FROM TAGS WHERE BLOG_ID=?;';
const deleteLikesQuery = 'DELETE FROM LIKES WHERE BLOG_ID=?;';


export async function DELETE(request: NextRequest) {
    let connection: PoolConnection | undefined;
    try {
    
        const user=(await getUser(request))?.email

        if(!user || user===null){
            return NextResponse.redirect(new URL('/auth/login?error=TOKEN_EXPIRED',request.url))
        }
        
        let blogId=request.nextUrl.searchParams.get('blog-id') as string

        if(!blogId){
               return NextResponse.json({msg:"Blog ID is required"},{status:400})
        }

        connection = await getConnection(DATABASE_INSTANCE);
        

        console.log(await checkOwnership(connection,user,blogId))
        if(!(await checkOwnership(connection,user,blogId))){

            return NextResponse.json({msg:"Access denied"},{status:403})
        }

        await connection.beginTransaction();
        await executeQuery(connection, deleteLikesQuery, [blogId]);
        await executeQuery(connection, deleteTagsQuery, [blogId]);
        await executeQuery(connection, deleteBlogQuery, [blogId]);

        try{
            await firebaseStorage.bucket().file(`${user}/${blogId}`).delete();
        }catch(err){
            //  user didnt stored any image for this blog
        }

        await connection.commit();

        const response = NextResponse.json({ msg:"Blog deleted successfully" }, { status: 410 });
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
