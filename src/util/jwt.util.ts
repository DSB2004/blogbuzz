"use server"
import { SECRET } from '@/config';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = new TextEncoder().encode(SECRET);


export async function createToken(payload: any, expiresIn = '7d') {
    const alg = 'HS256'

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime(expiresIn)
        .sign(secretKey)
    return "Bearer " + jwt;
}

export async function verifyToken(token: string): Promise<any> {
    try {
        const jwt = token.startsWith("Bearer ") ? token.slice(7) : token;
        const { payload } = await jwtVerify(jwt, secretKey, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        });
        return payload;
    } catch (error) {
        return null;
    }
}
