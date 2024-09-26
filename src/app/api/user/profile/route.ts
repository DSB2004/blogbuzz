import DATABASE_INSTANCE from '@/lib/db';
import { executeQuery, getConnection } from '@/util/handleDatabase';
import { getUser } from '@/util/handleUser'
import { NextResponse, NextRequest } from 'next/server'
import { firebaseStorage } from '@/lib/firebase';


const userProfileQuery='SELECT * FROM USER_PROFILE WHERE EMAIL=?;'

export async function GET(request:NextRequest){
   const user=(await getUser(request))?.email
   let reqEmail=request.nextUrl.searchParams.get('user-email');

   if(!reqEmail){
    return NextResponse.json({ msg: "User email is required" },{status:400});
   }
   let connection;

    try{
        let bucket=firebaseStorage.bucket()

        connection =await getConnection(DATABASE_INSTANCE);
        let result=await executeQuery(connection,userProfileQuery,[reqEmail]);
        
        if(!result || result.length===0){
            return NextResponse.json({ msg: "User not found" });
        }
        
        
        result[0]['LINKS']= result[0]['LINKS'].split(",")
        
        if(result[0]['PROFILE_PIC']!=='none'){

            let storageRef = bucket.file(`${reqEmail}/${reqEmail}`);
            result[0]['PROFILE_PIC']=( await storageRef.getSignedUrl({
                action: 'read',
                expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
            }))[0];
        }

        return NextResponse.json({msg:"User profile",profile:result[0],owner:user===reqEmail})
        
    }
    catch(err){
        console.error('Error:', err);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });

    }finally{
        connection?.release()
    }
}