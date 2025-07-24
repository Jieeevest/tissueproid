import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
