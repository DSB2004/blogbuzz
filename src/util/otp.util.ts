"use server"
import { totp } from 'otplib';
import { SECRET } from '@/config';

export const generateOtp = () => {

    totp.options = { digits: 6, step: 300 };
    return totp.generate(SECRET);
}

export const verifyOtp = (token: string) => {
    return totp.verify({ token, secret: SECRET });
}
