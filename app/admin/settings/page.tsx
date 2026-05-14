import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * /admin/settings → redirect ke sub-halaman utama
 * Tambahkan halaman pengaturan lain di sini nanti
 * (misal: /admin/settings/site-config, /admin/settings/notifikasi, dll.)
 */
export default function AdminSettingsPage() {
  redirect("/admin/settings/manajemen-admin");
}
