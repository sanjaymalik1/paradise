import prisma from "@/services/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      hotelId,
      name,
      price,
      maxGuests,
      images,
      roomSize,
      amenities
    } = body;

    // Basic validation
    if (!hotelId || !name || !price) {
      return NextResponse.json(
        { success: false, message: "hotelId, name, and price are required" },
        { status: 400 }
      );
    }

    // Check if hotel exists
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return NextResponse.json(
        { success: false, message: "Hotel not found" },
        { status: 404 }
      );
    }

    // Create room type
    const roomType = await prisma.roomType.create({
      data: {
        hotelId,
        name,
        price,
        maxGuests: maxGuests || 2,
        images: images || [],
        roomSize,
        amenities: amenities || [],
      },
    });

    return NextResponse.json(
      { success: true, roomType },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("CREATE ROOM TYPE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
