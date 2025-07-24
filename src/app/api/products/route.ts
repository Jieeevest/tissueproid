import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (
      !data.name ||
      !data.description ||
      data.price === undefined ||
      !data.image ||
      !data.categoryId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        categoryId: data.categoryId,
        featured: data.featured || false,
        rating: data.rating || 0,
        stock: data.stock || 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
