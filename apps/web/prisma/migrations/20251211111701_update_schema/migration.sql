/*
  Warnings:

  - You are about to drop the column `roomTypeId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomTypeId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the `RoomType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[hotelId,date]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `maxGuests` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_roomTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_roomTypeId_fkey";

-- DropForeignKey
ALTER TABLE "RoomType" DROP CONSTRAINT "RoomType_hotelId_fkey";

-- DropIndex
DROP INDEX "Inventory_roomTypeId_date_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "roomTypeId";

-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "discountedPrice" INTEGER,
ADD COLUMN     "maxGuests" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "ratingCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ratingStar" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "roomSize" INTEGER;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "roomTypeId",
ADD COLUMN     "hotelId" TEXT NOT NULL;

-- DropTable
DROP TABLE "RoomType";

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_hotelId_date_key" ON "Inventory"("hotelId", "date");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
