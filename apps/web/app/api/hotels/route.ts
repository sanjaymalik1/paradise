import { NextResponse } from "next/server";
import prisma from "@/services/prisma";

export async function GET() {
  const hotels = await prisma.hotel.findMany();

  return NextResponse.json({ success: true, hotels,
    meta:{
      location: "India",
      resultsCount : hotels.length
    }
   });
}
