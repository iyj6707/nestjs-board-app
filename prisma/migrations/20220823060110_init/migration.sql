-- CreateEnum
CREATE TYPE "BoardStatus" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "BoardStatus" NOT NULL DEFAULT 'PUBLIC',

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
