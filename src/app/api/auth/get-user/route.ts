import DATABASE_INSTANCE from "@/lib/db";
import { getConnection, executeQuery } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";
import { NextResponse, NextRequest } from "next/server";

const userQuery = "SELECT NAME,EMAIL FROM USER WHERE EMAIL=?;";

export async function GET(request: NextRequest) {
  let connection;
  try {
    const user = await getUser(request);
    if (!user || user === null) {
      return NextResponse.redirect(
        new URL("/auth/login?error=TOKEN_EXPIRED", request.url)
      );
    }
    connection = await getConnection(DATABASE_INSTANCE);
    let res = await executeQuery(connection, userQuery, [user.email]);

    if (!res || res.length === 0) {
      return NextResponse.redirect(
        new URL("/auth/login?error=NOT_FOUND", request.url)
      );
    }

    return NextResponse.json({ msg: "User found", user: res[0] });
  } catch (err) {
  } finally {
    connection?.release();
  }
}
