"use server";

import prisma from "@/lib/prisma";
import { verifyToken } from "./jwt.util";

import { cookies } from "next/headers";

export async function getUser(): Promise<{
  email: string;
  name: string;
} | null> {
  let user = null;
  let access_token = cookies().get("access-token")?.value;
  if (access_token) {
    user = await verifyToken(access_token);
  }
  return user;
}

export async function getUserInfo() {
  let user = await getUser();

  let res = await prisma.user.findFirst({
    where: { email: user?.email },
    select: { email: true, name: true, socialLinks: true, workType: true },
  });
  return res;
}

export async function deleteUser() {
  return cookies().delete("access-token");
}
