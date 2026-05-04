"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { z } from "zod";

const LoginSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(4, "Password minimal 4 karakter"),
});

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "sangat-rahasia-sekali");

export async function loginAction(formData: FormData) {
  try {
    const rawData = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    const validData = LoginSchema.safeParse(rawData);
    if (!validData.success) {
      throw new Error(validData.error.issues[0].message);
    }

    const { username, password } = validData.data;

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      throw new Error("Username atau password salah");
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      throw new Error("Username atau password salah");
    }

    const token = await new SignJWT({ 
        id: admin.id, 
        username: admin.username, 
        role: admin.role,
        namaLengkap: admin.namaLengkap 
      })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secretKey);
    
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 jam
      path: "/",
    });

    return { success: true, message: "Login berhasil" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  cookieStore.delete("userRole");
}
