import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/client";
import { Prisma } from "@prisma/client";

// GET /api/invoices/[id] - Get invoice details
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // Get invoice details
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Check if the invoice belongs to the user or user is admin
    if (
      invoice.order.userId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/invoices/[id]/pay - Mark invoice as paid
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    // Get invoice details
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Check if the invoice belongs to the user or user is admin
    if (
      invoice.order.userId !== session.user.id &&
      session.user.role !== "ADMIN"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if invoice is already paid
    if (invoice.paidDate) {
      return NextResponse.json(
        { error: "Invoice is already paid" },
        { status: 400 }
      );
    }

    // Update invoice and order in a transaction
    const updatedInvoice = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // Update invoice
        const updatedInvoice = await tx.invoice.update({
          where: { id },
          data: {
            paidDate: new Date(),
          },
        });

        // Update order payment status
        await tx.order.update({
          where: { id: invoice.orderId },
          data: {
            paymentStatus: "PAID",
          },
        });

        return updatedInvoice;
      }
    );

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
