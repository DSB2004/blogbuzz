import DATABASE_INSTANCE from "@/lib/db";
import { executeQuery, getConnection } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";
import { NextResponse, NextRequest } from "next/server";
import { firebaseStorage } from "@/lib/firebase";

const blogProfileQuery = `
  SELECT * ,
  (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END  FROM LIKES L WHERE L.LIKED_BY=? AND L.BLOG_ID = B.ID ) AS 'LIKED_BY_YOU',
  (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END  FROM SAVES S WHERE S.SAVED_BY=? AND S.BLOG_ID = B.ID ) AS 'SAVED_BY_YOU'
  FROM BLOG_PROFILE B
  WHERE B.ID=?;
`;

export async function GET(request: NextRequest) {
  const user = (await getUser(request))?.email;

  let reqBlog = request.nextUrl.searchParams.get("blog-id");

  if (!reqBlog) {
    return NextResponse.json({ msg: "Blog id is required" }, { status: 400 });
  }

  let connection;

  try {
    let bucket = firebaseStorage.bucket();

    connection = await getConnection(DATABASE_INSTANCE);
    let result = await executeQuery(connection, blogProfileQuery, [
      user, // for LIKED_BY
      user, // for SAVED_BY
      reqBlog, // Blog ID
    ]);

    if (!result || result.length === 0) {
      return NextResponse.json({ msg: "Blog not found" });
    }

    // Split tags by comma
    if (result[0]["TAGS"]) {
      result[0]["TAGS"] = result[0]["TAGS"].split(",");
    }

    // Handle profile image, skip if IMG is "none"
    if (result[0]["IMG"] !== "none") {
      let storageRef = bucket.file(result[0]["IMG"]);
      result[0]["IMG"] = (
        await storageRef.getSignedUrl({
          action: "read",
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
        })
      )[0];
    }

    result[0]["SAVED_BY_YOU"] = result[0]["SAVED_BY_YOU"] === 1 ? true : false;
    result[0]["LIKED_BY_YOU"] = result[0]["LIKED_BY_YOU"] === 1 ? true : false;

    return NextResponse.json({
      msg: `Blog profile id:${reqBlog}`,
      profile: result[0],
      owner: user === result[0]["CREATED_BY"],
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  } finally {
    connection?.release();
  }
}
