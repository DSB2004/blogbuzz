import { totp } from 'otplib';
import { JWT_SECRET } from '@/env';

console.log(JWT_SECRET)
export const generateOtp = () => {
    totp.options = { digits: 6, step: 300 }; 
    const token = totp.generate(JWT_SECRET);
    console.log("OTP generated: ", token);
    return token;
}

export const verifyOtp = (token: string) => {

    return totp.verify({token, secret:JWT_SECRET});
}
