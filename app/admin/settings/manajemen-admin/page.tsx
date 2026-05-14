import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { getAllAdmins } from "@/actions/admin.action";
import ManajemenAdminClient from "@/components/admin/ManajemenAdminClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manajemen Admin | Admin Wergu Wetan",
  description: "Kelola akun petugas dan Super Admin portal Kelurahan Wergu Wetan.",
};

export default async function ManajemenAdminPage() {
  // ── Verifikasi token & ekstrak user info ──────────────────────────────────
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  let currentUserId = 0;
  let currentRole = "admin";

  try {
    const secretKey = new TextEncoder().encode(
      process.env.JWT_SECRET || "sangat-rahasia-sekali"
    );
    const { payload } = await jwtVerify(token, secretKey);
    currentUserId = (payload.id as number) ?? 0;
    currentRole = (payload.role as string) ?? "admin";
  } catch {
    redirect("/admin/login");
  }

  // ── RBAC: hanya Super Admin yang boleh akses ──────────────────────────────
  if (currentRole !== "super") {
    redirect("/admin/dashboard");
  }

  // ── Fetch data admin dari DB ──────────────────────────────────────────────
  const admins = await getAllAdmins();

  return (
    <div className="p-6">
      <ManajemenAdminClient admins={admins} currentUserId={currentUserId} />
    </div>
  );
}
