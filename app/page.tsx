import { redirect } from "next/navigation";

export default function RootPage() {
  // Ini fungsinya kayak polisi lalu lintas
  // Begitu user buka '/', langsung dilempar ke '/home'
  redirect("/home");
}
