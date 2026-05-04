import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "sangat-rahasia-sekali");

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith("/admin/login");

  // Jika pengunjung mencoba mengakses halaman login
  if (isLoginPage) {
    if (token) {
      try {
        await jwtVerify(token, secretKey);
        // Jika token valid, lempar ke dashboard (sudah login)
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch (error) {
        // Token tidak valid/expired, hapus cookie dan biarkan di halaman login
        const response = NextResponse.next();
        response.cookies.delete("admin_token");
        return response;
      }
    }
    return NextResponse.next(); // Biarkan mengakses halaman login
  }

  // Melindungi seluruh URL di bawah /admin (kecuali /admin/login)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      // Jika tidak ada token, paksa kembali ke login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Verifikasi kriptografi JWT (mencegah bypass atau manipulasi)
      const { payload } = await jwtVerify(token, secretKey);
      
      // Meneruskan request yang sah. Kita bisa menyisipkan role ke header jika perlu
      const response = NextResponse.next();
      response.headers.set("x-user-role", payload.role as string);
      return response;
    } catch (error) {
      console.error("JWT Verification failed:", error);
      // Token palsu atau kedaluwarsa -> tendang ke login
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

// Menentukan rute mana saja yang ditangkap oleh middleware ini
export const config = {
  matcher: ["/admin/:path*"],
};
