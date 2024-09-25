import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside


const createUserQuery='INSERT'
export async function PATCH(request:NextRequest){
    return new Response("hello from PATCH /api/user/update")
}