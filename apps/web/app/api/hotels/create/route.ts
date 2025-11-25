import { NextResponse } from "next/server";
import prisma from "@/services/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, city, address, images, category, tags } = body;

    if (!name || !city || !address) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        description,
        city,
        address,
        images: images || [],
        category: category || "Standard",
        tags: tags || [],
      },
    });

    return NextResponse.json({ success: true, hotel }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
