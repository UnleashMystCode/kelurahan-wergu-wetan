import { redirect } from "next/navigation";

export default function AdminRootPage() {
  // Begitu buka /admin, langsung lempar ke /admin/dashboard
  redirect("/admin/dashboard");
}