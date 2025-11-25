import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";

export async function GET() {
  try {
    const users = await prismaClient.user.findMany();
    
    return NextResponse.json({ 
      success: true, 
      users,
      message: `Database connected! Found ${users.length} users`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Database connection failed"
    }, { status: 500 });
  }
}
