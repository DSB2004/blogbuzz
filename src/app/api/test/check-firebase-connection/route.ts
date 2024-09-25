import{ firebaseStorage } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try{

        let storage=firebaseStorage

        if(storage){
            return NextResponse.json({msg:"Connected to firebase"})
        }
    }
    catch(Err){
        console.log(Err)

        return NextResponse.json({msg:"Error connecting to firebase"})
    }
}