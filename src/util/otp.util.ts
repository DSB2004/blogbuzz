"use server";
import { totp } from "otplib";
import { SECRET } from "@/config";

export const generateOtp = async (): Promise<string> => {
  return new Promise((res, rej) => {
    totp.options = { digits: 6, step: 300 };
    let otp = totp.generate(SECRET);
    if (otp) {
      res(otp);
    } else {
      rej("failed to generate otp");
    }
  });
};

export const verifyOtp = (token: string) => {
  return totp.verify({ token, secret: SECRET });
};
