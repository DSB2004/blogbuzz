import { deleteUser } from "@/util/handleUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE (request:NextRequest){
await deleteUser(request);
return NextResponse.json({msg:"User logout successful"},{status:410})
}