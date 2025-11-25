import { NextResponse } from "next/server";
import prisma from "@/services/prisma";

export async function GET() {
  const hotels = await prisma.hotel.findMany({
    include: {
      roomTypes: true,
    },
  });

  return NextResponse.json({ success: true, hotels });
}
