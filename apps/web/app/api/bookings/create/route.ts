import prisma from "@/services/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

type JwtPayload = {
  id: string;
  email: string;
};

function getDatesBetween(checkIn: Date, checkOut: Date): Date[] {
  // hotel-style: nights = [checkIn, checkOut)
  const dates: Date[] = [];
  const current = new Date(checkIn);

  while (current < checkOut) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export async function POST(req: Request) {
  try {
    // 1. Get token from header and decode user
    // const authHeader = req.headers.get("authorization");
    // const token = authHeader?.replace("Bearer ", "");

    // if (!token) {
    //   return NextResponse.json(
    //     { success: false, message: "No token provided" },
    //     { status: 401 }
    //   );
    // }

    // const { valid, decoded } = verifyToken(token) as {
    //   valid: boolean;
    //   decoded: JwtPayload | null;
    // };

    // if (!valid || !decoded) {
    //   return NextResponse.json(
    //     { success: false, message: "Invalid or expired token" },
    //     { status: 401 }
    //   );
    // }

    // const userId = decoded.id;

    const userId = "343427a0-fecf-4797-84fa-f5c32f3f9cb5"

    // 2. Parse body
    const body = await req.json();
    const { roomTypeId, checkIn, checkOut, guests } = body;

    if (!roomTypeId || !checkIn || !checkOut) {
      return NextResponse.json(
        {
          success: false,
          message: "roomTypeId, checkIn and checkOut are required",
        },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid date format" },
        { status: 400 }
      );
    }

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { success: false, message: "checkOut must be after checkIn" },
        { status: 400 }
      );
    }

    // 3. Fetch roomType & hotel
    const roomType = await prisma.roomType.findUnique({
      where: { id: roomTypeId },
      include: { hotel: true },
    });

    if (!roomType) {
      return NextResponse.json(
        { success: false, message: "RoomType not found" },
        { status: 404 }
      );
    }

    if (guests && guests > roomType.maxGuests) {
      return NextResponse.json(
        {
          success: false,
          message: `Max guests for this room is ${roomType.maxGuests}`,
        },
        { status: 400 }
      );
    }

    const nights = getDatesBetween(checkInDate, checkOutDate);
    if (nights.length === 0) {
      return NextResponse.json(
        { success: false, message: "Stay must be at least 1 night" },
        { status: 400 }
      );
    }

    const totalPrice = nights.length * roomType.price;

    // 4. Transaction: decrement inventory for each night & create booking
    const booking = await prisma.$transaction(async (tx) => {
      // For every night, decrement available if available >= 1
      for (const date of nights) {
        const result = await tx.inventory.updateMany({
          where: {
            roomTypeId,
            date,
            available: {
              gte: 1,
            },
          },
          data: {
            available: {
              decrement: 1,
            },
          },
        });

        if (result.count === 0) {
          // This night has no availability → rollback transaction
          throw new Error("No availability for selected dates");
        }
      }

      // If we reach here, all nights have availability
      const created = await tx.booking.create({
        data: {
          userId,
          hotelId: roomType.hotelId,
          roomTypeId,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          totalPrice,
          status: "CONFIRMED", // later can be PENDING until payment success
        },
        include: {
          hotel: true,
          roomType: true,
        },
      });

      return created;
    });

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CREATE BOOKING ERROR:", error);

    if (error instanceof Error && error.message.includes("No availability")) {
      return NextResponse.json(
        { success: false, message: "No availability for selected dates" },
        { status: 409 } // conflict
      );
    }

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
