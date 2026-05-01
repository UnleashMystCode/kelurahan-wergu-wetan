import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import PotensiDetailView from "@/components/user/PotensiDetailView";

export const dynamic = "force-dynamic";

export default async function PotensiDesaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await new Promise((resolve) => setTimeout(resolve, 500)); // Artificial delay for skeleton

  const potensi = await prisma.potensiDesa.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!potensi) {
    notFound();
  }

  return <PotensiDetailView potensi={potensi} />;
}
