"use server"

import { verifyToken } from "./jwt.util";

import { cookies } from "next/headers";

export async function getUser(): Promise<{ email: string } | null> {
    let user = null;
    let access_token = cookies().get('access-token')?.value;
    if (access_token) {
        user = await verifyToken(access_token);

    }
    return user;
}


export async function deleteUser() {
    return cookies().delete('access-token');
}


