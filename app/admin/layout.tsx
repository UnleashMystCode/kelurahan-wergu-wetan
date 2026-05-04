import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  let userRole: "admin" | "super" = "admin";

  if (token) {
    try {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "sangat-rahasia-sekali");
      const { payload } = await jwtVerify(token, secretKey);
      if (payload.role === "super") {
        userRole = "super";
      }
    } catch (error) {
      console.error("Layout JWT Decode Error:", error);
    }
  }

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
