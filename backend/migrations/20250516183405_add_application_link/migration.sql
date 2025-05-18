/*
  Warnings:

  - Added the required column `applicationLink` to the `Requirements` table without a default value. This is not possible if the table is not empty.

*/
-- First add the column as nullable
ALTER TABLE "Requirements" ADD COLUMN "applicationLink" TEXT;

-- Update existing records to have a default value 
-- (use application URL if available, or a placeholder)
UPDATE "Requirements" 
SET "applicationLink" = COALESCE("applicationUrl", 'https://example.com/apply');

-- Now make the column required 
ALTER TABLE "Requirements" ALTER COLUMN "applicationLink" SET NOT NULL;
