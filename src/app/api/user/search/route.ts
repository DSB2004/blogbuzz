import DATABASE_INSTANCE from '@/lib/db';
import { executeQuery, getConnection } from '@/util/handleDatabase';
import { NextResponse, NextRequest } from 'next/server'



const userProfileQuery='SELECT NAME,EMAIL FROM USER_PROFILE WHERE LOWER(NAME) REGEXP LOWER(?);'

export async function GET(request:NextRequest){
   
   let reqName=request.nextUrl.searchParams.get('user-name');

   if(!reqName){
    return NextResponse.json({ msg: "User name is required" },{status:400});
   }
   let connection;

    try{
        connection =await getConnection(DATABASE_INSTANCE);
        let result=await executeQuery(connection,userProfileQuery,[reqName]);
        
        if(!result || result.length===0){
            return NextResponse.json({ msg: "No user found" });
        }

        return NextResponse.json({msg:"User profile",users:result})
        
    }
    catch(err){
        console.error('Error:', err);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });

    }finally{
        connection?.release()
    }
}