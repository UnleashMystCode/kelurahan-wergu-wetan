import { cookies } from "next/headers";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userRoleCookie = cookieStore.get("userRole")?.value;
  const userRole = (userRoleCookie === "super" ? "super" : "admin") as "admin" | "super";

  return <AdminShell userRole={userRole}>{children}</AdminShell>;
}
