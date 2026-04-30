import PotensiDesaView from "@/components/user/PotensiDesaView";

export default async function PotensiDesaPage() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return <PotensiDesaView />;
}
