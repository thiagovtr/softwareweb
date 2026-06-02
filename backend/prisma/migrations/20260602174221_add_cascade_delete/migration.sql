-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_fileId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
