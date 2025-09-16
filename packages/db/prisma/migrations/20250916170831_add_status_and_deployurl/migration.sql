-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "deployUrl" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'uploaded';
