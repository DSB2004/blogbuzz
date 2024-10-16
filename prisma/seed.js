const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "db.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const { users, saves, blogs, comments, likes } = data;

  try {
    await prisma.$transaction([
      prisma.user.createMany({
        data: users,
        skipDuplicates: true,
      }),
      prisma.blog.createMany({
        data: blogs,
        skipDuplicates: true,
      }),
      prisma.like.createMany({
        data: likes,
        skipDuplicates: true,
      }),
      prisma.save.createMany({
        data: saves,
        skipDuplicates: true,
      }),
      prisma.comment.createMany({
        data: comments,
        skipDuplicates: true,
      }),
    ]);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    // done seeding
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
