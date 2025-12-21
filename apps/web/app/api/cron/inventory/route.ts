import prisma from "@/services/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


// Normalize date to UTC midnight (important!)
function getTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ));
}

export async function GET() {
  try {
    const today = getTodayUTC();

    // Fetch all hotels
    const hotels = await prisma.hotel.findMany({
      select: { id: true },
    });

    // Run inventory updates in a transaction
    await prisma.$transaction(
      hotels.map((hotel) =>
        prisma.inventory.upsert({
          where: {
            hotelId_date: {
              hotelId: hotel.id,
              date: today,
            },
          },
          update: {
            available: {
              increment: 2, // add 2 rooms if already exists
            },
          },
          create: {
            hotelId: hotel.id,
            date: today,
            available: 2, // create fresh inventory
          },
        })
      )
    );
    console.log("DB:", process.env.DATABASE_URL);

    return NextResponse.json({
      message: "Daily inventory updated successfully",
      date: today.toISOString(),
      hotelsProcessed: hotels.length,
    });
  } catch (error: any) {
    console.error("Inventory Cron Error:", error);

    return NextResponse.json(
      {
        error: "Failed to update inventory",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
