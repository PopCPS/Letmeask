/*
  Warnings:

  - Added the required column `title` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_post" ("created_at", "id", "question", "user_id") SELECT "created_at", "id", "question", "user_id" FROM "post";
DROP TABLE "post";
ALTER TABLE "new_post" RENAME TO "post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
