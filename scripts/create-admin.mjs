// Script to create a superadmin account
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // Data superadmin
    const email = "admin@tissueproid.com";
    const password = "Admin123!";
    const name = "Super Admin";

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User with this email already exists!");
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log(`Superadmin successfully created with ID: ${user.id}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("Please use these credentials to login.");
  } catch (error) {
    console.error("Error creating superadmin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
