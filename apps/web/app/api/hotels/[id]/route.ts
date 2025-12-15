import prisma from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing hotel ID" },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id }
    });

    if (!hotel) {
      return NextResponse.json(
        { success: false, message: "Hotel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, hotel }, { status: 200 });

  } catch (error: any) {
    console.error("GET HOTEL ERROR:", error);

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
