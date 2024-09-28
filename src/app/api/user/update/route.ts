import DATABASE_INSTANCE from "@/lib/db";
import { firebaseStorage } from "@/lib/firebase";
import { executeQuery, getConnection } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";

import { NextResponse, NextRequest } from "next/server";

const updateUserQuery =
  "UPDATE USER SET NAME=? , ABOUT=?,PROFILE_PIC=? WHERE EMAIL=?;";
const deleteSocialLinksQuery = "DELETE FROM SOCIAL_LINKS WHERE EMAIL=?;";
const insertSocialLinksQuery =
  "INSERT INTO SOCIAL_LINKS (USER_EMAIL,LINK) VALUES ?;";

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
    bucket = firebaseStorage.bucket();
    connection = await getConnection(DATABASE_INSTANCE);

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = user?.email as string;
    const about = (formData.get("about") as string) || "";

    const socialLinkRaw = (formData.get("social_link") as string) || "";

    const file = formData.get("profile_pic");
    let fileName = `${email}`;

    if (!name || !email) {
      return NextResponse.json({ msg: "Field not found" }, { status: 400 });
    }

    await connection.beginTransaction();

    await executeQuery(connection, updateUserQuery, [
      name,
      about,
      file === "none" ? file : email,
      email,
    ]);

    if (socialLinkRaw) {
      let social_link;
      try {
        social_link = JSON.parse(socialLinkRaw);
      } catch (error) {
        console.error("Invalid JSON for social_link:", error);
        return NextResponse.json(
          { msg: "Invalid social link format" },
          { status: 400 }
        );
      }

      if (social_link && social_link.length > 0) {
        await executeQuery(connection, deleteSocialLinksQuery, [email]);
        // @ts-ignore
        const social_link_array = social_link.map((ele) => [email, ele]);
        await executeQuery(connection, insertSocialLinksQuery, [
          social_link_array,
        ]);
      }
    }

    if (file === "none") {
      await bucket.file(email).delete();
    } else if (file && file instanceof File) {
      console.log("user fie updated");
      const storageRef = bucket.file(`${email}/${email}`);
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
    return NextResponse.json({ msg: "User account updated" }, { status: 200 });
  } catch (err) {
    console.error("Error occurred:", err);
    await connection?.rollback();
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  } finally {
    connection?.release();
  }
}
