
// jwt
export const JWT_SECRET: string = process.env.JWT_SECRET || "";

// mysql 
export const DB_HOST: string = process.env.DB_HOST || "";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
export const DB_USERNAME: string = process.env.DB_USERNAME || "";
export const DB_DATABASE: string = process.env.DB_DATABASE || "";

// redis
export const REDIS_HOST: string = process.env.REDIS_HOST || "";
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "";
export const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 15286;
