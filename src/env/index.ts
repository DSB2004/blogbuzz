import { preconnect } from "react-dom";

// jwt
export const JWT_SECRET: string = process.env.JWT_SECRET || "";

// mysql 
export const DB_HOST: string = process.env.DB_HOST || "";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
export const DB_USERNAME: string = process.env.DB_USERNAME || "";
export const DB_DATABASE: string = process.env.DB_DATABASE || "";

// redis
export const REDIS_URL: string = process.env.REDIS_URL || "";



// firebase

export const FIREBASE_CLIENT_EMAIL:string=process.env.FIREBASE_CLIENT_EMAIL||"";
export const FIREBASE_PRIVATE_KEY:string=process.env.FIREBASE_PRIVATE_KEY||"";
export const FIREBASE_PROJECT_ID:string=process.env.FIREBASE_PROJECT_ID||"";
export const FIREBASE_STORAGE_BUCKET:string=process.env.FIREBASE_STORAGE_BUCKET||""