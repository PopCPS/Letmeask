/*
  Warnings:

  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `question_id` on the `reply` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "question";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "room";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "reply" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    CONSTRAINT "reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reply_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reply_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "reply" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_reply" ("id", "parent_id", "reply", "user_id") SELECT "id", "parent_id", "reply", "user_id" FROM "reply";
DROP TABLE "reply";
ALTER TABLE "new_reply" RENAME TO "reply";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
