import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function GET(request:NextRequest){
    return new Response("hello from GET /api/user/search")
}