import DATABASE_INSTANCE from '@/lib/db';
import { firebaseStorage } from '@/lib/firebase';
import { executeQuery, getConnection } from '@/util/handleDatabase';
import { getUser } from '@/util/handleUser';
import {v4} from  'uuid'

import { NextResponse, NextRequest } from 'next/server';

const createBlogQuery = 'INSERT INTO BLOG (ID,TITLE,BODY,CREATED_BY,IMG) VALUES (? , ?, ?, ?, ?);';

export async function PUT(request: NextRequest) {
    let bucket; 
    let connection;
    let user;

    try {
        user = await getUser(request);
        
        
        if(!user || user===null){
            return NextResponse.redirect(new URL('/auth/login?error=TOKEN_EXPIRED',request.url))
            
        }
        const formData = await request.formData();


        const blog_id=v4()
        const title= formData.get('title') as string;
        const created_by = user?.email as string;
        const body = formData.get('body') as string || "";
       
        
        
        bucket = firebaseStorage.bucket();
        connection = await getConnection(DATABASE_INSTANCE);

        const file = formData.get('img') as File;

        if (!title|| !body) {
            return NextResponse.json({ msg: "Field not found" }, { status: 400 });
        }

        await connection.beginTransaction();
        let fileName =  "none";

        if(file){
            fileName = `${blog_id}`;
        }
            
        await executeQuery(connection, createBlogQuery, [blog_id,title, body, created_by,fileName]);
      
        if (file) {
            const storageRef = bucket.file(`${created_by}/${blog_id}`);
            const stream = storageRef.createWriteStream({
                metadata: {
                    contentType: file.type,
                },
            });
            const buffer = await file.arrayBuffer();
            stream.end(Buffer.from(buffer));

            await new Promise((resolve, reject) => {
                stream.on('finish', resolve);
                stream.on('error', reject);
            });
        }

        await connection.commit();
        return NextResponse.json({ msg: "Blog created" }, { status: 201 });
    
    } catch (err) {
        console.error('Error occurred:', err);
        await connection?.rollback();
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    } finally {
        connection?.release();
    }
}
