import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

// POST /api/users/register - Register a new user (admin only can create new admins)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only allow admin to create new users
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.email || !data.password || !data.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "USER",
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    console.log(password);
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
