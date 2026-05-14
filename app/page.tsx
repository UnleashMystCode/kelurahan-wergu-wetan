import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function RootPage() {
  // Ini fungsinya kayak polisi lalu lintas
  // Begitu user buka '/', langsung dilempar ke '/home'
  redirect("/home");
}
