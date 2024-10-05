export const dynamic = "force-dynamic";
import DATABASE_INSTANCE from "@/lib/db";
import { executeQuery, getConnection } from "@/util/handleDatabase";
import { getUser } from "@/util/handleUser";
import { NextRequest, NextResponse } from "next/server";

const filterBlogQuery = `
  SELECT ID, TITLE, LIKES, SAVES, TAGS,
    (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM LIKES L WHERE L.LIKED_BY=? AND L.BLOG_ID=B.ID) AS 'LIKED_BY_YOU',
    (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM SAVES S WHERE S.SAVED_BY=? AND S.BLOG_ID=B.ID) AS 'SAVED_BY_YOU' 
  FROM BLOG_PROFILE B 
  LEFT JOIN TAGS T ON B.ID=T.BLOG_ID 
  WHERE UPPER(T.TAG) IN (?) LIMIT 10 OFFSET ?;`;

const noFilterBlogQuery = `
  SELECT ID, TITLE, LIKES, SAVES, TAGS,
    (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM LIKES L WHERE L.LIKED_BY=? AND L.BLOG_ID=B.ID) AS 'LIKED_BY_YOU',
    (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM SAVES S WHERE S.SAVED_BY=? AND S.BLOG_ID=B.ID) AS 'SAVED_BY_YOU'
  FROM BLOG_PROFILE B 
  LEFT JOIN TAGS T ON B.ID=T.BLOG_ID 
  LIMIT 10 OFFSET ?;`;

const userBlogQuery = `
  SELECT ID, TITLE, LIKES, SAVES, TAGS,
    (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM LIKES L WHERE L.LIKED_BY=? AND L.BLOG_ID=B.ID) AS 'LIKED_BY_YOU',
    (SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM SAVES S WHERE S.SAVED_BY=? AND S.BLOG_ID=B.ID) AS 'SAVED_BY_YOU'
  FROM BLOG_PROFILE B 
  LEFT JOIN TAGS T ON B.ID=T.BLOG_ID 
  WHERE B.CREATED_BY=? 
  LIMIT 10 OFFSET ?;`;

export async function GET(request: NextRequest) {
  let searchFilter;
  let connection;
  let user;
  let reqUser;
  let offset = 0;
  let res = [];

  try {
    user = (await getUser(request))?.email;
    connection = await getConnection(DATABASE_INSTANCE);
    searchFilter = request.nextUrl.searchParams.getAll("tags");
    reqUser = request.nextUrl.searchParams.get("req-user");
    offset = Number(request.nextUrl.searchParams.get("offset")) || 0;

    if (searchFilter && searchFilter.length > 0) {
      searchFilter = searchFilter.map((tag) => tag.toUpperCase());
      res = await executeQuery(connection, filterBlogQuery, [
        user,
        user,
        searchFilter,
        offset,
      ]);
    } else if (reqUser) {
      res = await executeQuery(connection, userBlogQuery, [
        user,
        user,
        reqUser,
        offset,
      ]);
    } else {
      res = await executeQuery(connection, noFilterBlogQuery, [
        user,
        user,
        offset,
      ]);
    }

    console.log(res.length);
    // @ts-ignore
    const result = res.map((blog) => ({
      ...blog,
      TAGS: blog.TAGS ? blog.TAGS.toUpperCase().split(",") : [],
    }));
    console.log(result.length);

    return NextResponse.json({ msg: "Blogs", blogs: result });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  } finally {
    connection?.release();
  }
}
