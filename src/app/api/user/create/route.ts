import DATABASE_INSTANCE from '@/lib/db';
import { firebaseStorage } from '@/lib/firebase';
import { executeQuery, getConnection } from '@/util/handleDatabase';
import { getUser } from '@/util/handleUser';

import { NextResponse, NextRequest } from 'next/server';

const createUserQuery = 'INSERT INTO USER (NAME, EMAIL, PROFILE_PIC, ABOUT) VALUES (?, ?, ?, ?);';
const insertSocialLinksQuery = 'INSERT INTO SOCIAL_LINKS (USER_EMAIL,LINK) VALUES ?;';

export async function PUT(request: NextRequest) {
    let bucket; 
    let connection;
    let user;

    try {
        bucket = firebaseStorage.bucket();
        connection = await getConnection(DATABASE_INSTANCE);
        user = await getUser(request);

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = user?.email as string;
        const about = formData.get('about') as string || "";
        const socialLinkRaw = formData.get('social_link') as string || "";
        let social_link;

        try {
            social_link = JSON.parse(socialLinkRaw);
        } catch (error) {
            console.error('Invalid JSON for social_link:', error);
            return NextResponse.json({ msg: "Invalid social link format" }, { status: 400 });
        }

        const file = formData.get('profile_pic') as File;

        if (!name || !email) {
            return NextResponse.json({ msg: "Field not found" }, { status: 400 });
        }

        await connection.beginTransaction();
        let fileName =  "none";


        if(file){
            fileName = `${email}.${file.name.split('.').pop()}`;
        }
        try{

            await executeQuery(connection, createUserQuery, [name, email, fileName, about]);
        }catch(err){
           
            // @ts-ignore
            if(err.message==='ERR_DUPLICATE_VALUE'){
                return NextResponse.json({ msg: "User account exist" }, { status: 400 });
  
            }
        }

        if (social_link && social_link.length > 0) {
            // @ts-ignore
            const social_link_array = social_link.map(ele => [email, ele]);
            await executeQuery(connection, insertSocialLinksQuery, [social_link_array]);
        }

        if (file) {
            const storageRef = bucket.file(`profile_pics/${fileName}`);
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
        return NextResponse.json({ msg: "User account created" }, { status: 200 });
    
    } catch (err) {
        console.error('Error occurred:', err);
        await connection?.rollback();
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    } finally {
        connection?.release();
    }
}
