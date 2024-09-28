import DATABASE_INSTANCE from "@/lib/db";
import { executeQuery, getConnection } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";
import { NextRequest, NextResponse } from "next/server";

const removeSaveQuery = "DELETE FROM SAVES WHERE BLOG_ID=? AND SAVED_BY=?;";

export async function DELETE(request: NextRequest) {
  let connection;
  let user;
  let blog_id;
  try {
    user = (await getUser(request))?.email;

    if (!user || user === null) {
      return NextResponse.redirect(
        new URL("/auth/login?error=TOKEN_EXPIRED", request.url)
      );
    }

    blog_id = request.nextUrl.searchParams.get("blog-id");
    connection = await getConnection(DATABASE_INSTANCE);

    await executeQuery(connection, removeSaveQuery, [blog_id, user]);

    return NextResponse.json({ msg: "Save removed" });
  } catch (err) {
    console.error("Error occurred:", err);

    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  } finally {
    connection?.release();
  }
}
