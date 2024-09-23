import { JWT_SECRET } from "@/env";
import jwt from "jsonwebtoken";



export const createToken = (obj: any, expireIn: number | string) => {
    const token = jwt.sign(obj, JWT_SECRET, {
        expiresIn: expireIn,
    });
    return token;
}

export const decodeToken = async (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new Error("INVALID_TOKEN"));
            } else {
                resolve(decoded);
            }
        });
    });
}
