import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { v4 } from 'uuid';
import { verifyOtp } from "@/util/handleOtp";



export async function GET(request: NextRequest) {
  

    try {
        const otp = request.nextUrl.searchParams.get('otp');
        const otpSession = request.cookies.get('otp-session-id')?.value;
        
        if (!otpSession) {
            return NextResponse.json({ msg: "Session expired" }, { status: 403 });
        }

        if (!otp) {
            return NextResponse.json({ msg: "OTP required" }, { status: 400 });
        }

        const otpSessionContent = await redis.get(`otp-session:${otpSession}`);

        if (!otpSessionContent) {
            console.log("redis otp session not found")
            return NextResponse.json({ msg: "Session expired" }, { status: 403 });
        }

        const otpSessionParsedContent = JSON.parse(otpSessionContent);
        const orgOtp = otpSessionParsedContent.otp;
        const mode = otpSessionParsedContent.mode;
        const userEmail = otpSessionParsedContent.email;
        

        // console.log(orgOtp,otp,orgOtp===otp,verifyOtp(otp))  // for dev purpose

        if (orgOtp !== otp || !verifyOtp(otp)) {
            console.log("Something went wrong")
            return NextResponse.json({ msg: "OTP has expired or didn't match" }, { status: 401 });
        }
        
        request.cookies.delete('otp-session-id')
        await redis.del(`otp-session:${otpSession}`);

        const auth_session_id = v4();
        let response;
        
        if (mode === 'NEW_ACCOUNT') {
            await redis.set(`auth-session-id:${auth_session_id}`, userEmail);
            response = NextResponse.json({msg:'/auth/register'});
        } else if (mode === 'RESET_PASSWORD') {
            await redis.set(`auth-session-id:${auth_session_id}`, userEmail);
            response = NextResponse.json({msg:'/auth/reset-password'});
        } else if (mode === 'DELETE_ACCOUNT') {
            await redis.set(`auth-session-id:${auth_session_id}`, userEmail);
            response = NextResponse.json({msg:'/auth/delete-account'});
        } else {
            return NextResponse.redirect('/unauthorized');
        }

        response.cookies.set('auth-session-id', auth_session_id, {
            httpOnly: true,
            maxAge: 300,
            path: '/',
            sameSite: 'strict',
        });

        return response;

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });

    } finally {
        
    }
}
