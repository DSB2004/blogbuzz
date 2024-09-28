import DATABASE_INSTANCE from "@/lib/db";
import { executeQuery, getConnection } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";
import { NextRequest, NextResponse } from "next/server";

const addLikeQuery = "INSERT INTO LIKES (BLOG_ID,LIKED_BY) VALUES (?,?);";

export async function PUT(request: NextRequest) {
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

    try {
      await executeQuery(connection, addLikeQuery, [blog_id, user]);
    } catch (err) {
      return NextResponse.json({ msg: "Already liked" }, { status: 400 });
    }

    return NextResponse.json({ msg: "Like Added" });
  } catch (err) {
    console.error("Error occurred:", err);

    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  } finally {
    connection?.release();
  }
}
