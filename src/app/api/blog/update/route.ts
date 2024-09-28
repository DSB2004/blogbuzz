import DATABASE_INSTANCE from "@/lib/db";
import { firebaseStorage } from "@/lib/firebase";
import { executeQuery, getConnection } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";
import { NextResponse, NextRequest } from "next/server";
import { checkOwnership } from "@/util/handleUser";

const updateBlogQuery = "UPDATE BLOG SET TITLE=?, BODY=?,IMG=? WHERE ID=?;";
const deleteTagsQuery = "DELETE FROM TAGS WHERE BLOG_ID=?;";
const addTagsQuery = "INSERT INTO TAGS (BLOG_ID,TAG) VALUES ?;";
export async function PATCH(request: NextRequest) {
  let bucket;
  let connection;
  let user;

  try {
    user = await getUser(request);

    if (!user || user === null) {
      return NextResponse.redirect(
        new URL("/auth/login?error=TOKEN_EXPIRED", request.url)
      );
    }

    let blogId = request.nextUrl.searchParams.get("blog-id") as string;

    if (!blogId) {
      return NextResponse.json({ msg: "Blog ID is required" }, { status: 400 });
    }
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const created_by = user?.email as string;
    const body = (formData.get("body") as string) || "";
    const file = formData.get("img");
    const tags = formData.get("tags") as string;

    console.log(file);
    let tagList = [];

    if (tags) {
      tagList = JSON.parse(tags);
      // @ts-ignore
      tagList = tagList.map((tag) => [blogId, tag]);
    }

    bucket = firebaseStorage.bucket();
    connection = await getConnection(DATABASE_INSTANCE);

    if (!(await checkOwnership(connection, created_by, blogId))) {
      return NextResponse.json({ msg: "Access denied" }, { status: 403 });
    }

    if (!title) {
      return NextResponse.json({ msg: "Field not found" }, { status: 400 });
    }

    await connection.beginTransaction();

    await executeQuery(connection, updateBlogQuery, [
      title,
      body,
      file === "none" ? file : blogId,
      blogId,
    ]);

    // remove image
    if (file === "none") {
      try {
        await bucket.file(`${created_by}/${blogId}`).delete();
      } catch (err) {
        // no image was their to delete
      }
    }

    if (tagList && tagList.length > 0) {
      await executeQuery(connection, deleteTagsQuery, [blogId]);
      await executeQuery(connection, addTagsQuery, [tagList]);
    }

    // update image
    if (file && file instanceof File) {
      console.log("file updated");
      const storageRef = bucket.file(`${created_by}/${blogId}`);
      const stream = storageRef.createWriteStream({
        metadata: {
          contentType: file.type,
        },
      });
      const buffer = await file.arrayBuffer();
      stream.end(Buffer.from(buffer));

      await new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
      });
    }

    await connection.commit();

    return NextResponse.json({ msg: "Blog updated" }, { status: 200 });
  } catch (err) {
    console.error("Error occurred:", err);
    await connection?.rollback();
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  } finally {
    connection?.release();
  }
}
